using SistemaAcademico.Application.DTOs.Models;
using SistemaAcademico.Application.Exceptions;
using SistemaAcademico.Domain.Entities;
using SistemaAcademico.Domain.Interfaces; 
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Application.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;
        private readonly ISubjectRepository _subjectRepository;

        public StudentService(
            IStudentRepository studentRepository,
            ISubjectRepository subjectRepository)
        {
            _studentRepository = studentRepository;
            _subjectRepository = subjectRepository;
        }

        public async Task<Student> RegisterStudentSubjectsAsync(int idStudent, List<int> subjectIds) {


            if (subjectIds == null || !subjectIds.Any())
                throw new AppException("Debe seleccionar al menos una materia.");

            var currentStudent = await _studentRepository.GetByIdWithSubjectAsync(idStudent)
                   ?? throw new AppException("Estudiante no existe");

            var subjects = await _subjectRepository.GetByIdsAsync(subjectIds);
            if (subjects.Count != subjectIds.Count)
                throw new AppException("Una o más materias no existen.");



            currentStudent.StudentSubjects.Clear();
            foreach (var subject in subjects)
            {
                currentStudent.StudentSubjects.Add(new StudentSubject
                {
                    StudentId = currentStudent.Id,
                    SubjectId = subject.Id
                });
            }

            await _studentRepository.UpdateAsync(currentStudent);

            return currentStudent;
        }

        public async Task<List<StudentPartnerDto>> GetPartners(int idStudent)
        {

            var currentStudent = await _studentRepository.GetByIdWithSubjectAsync(idStudent)
                    ?? throw new AppException("Estudiante no existe");


            var mySubjects = currentStudent.StudentSubjects
                .Select(ss => ss.SubjectId)
                .ToHashSet();

            if(mySubjects.Count == 0) throw new AppException("Estudiante no existe");
            var partners = await _studentRepository.GetPartnersAsync(idStudent);

            return partners.Select(partner => new StudentPartnerDto
                {
                    Id = partner.Id,
                    Name = partner.Name,
                    sharedSubjects = partner.StudentSubjects
                        .Where(ss => mySubjects.Contains(ss.SubjectId))
                        .Select(ss => new SubjectDto
                        {
                            Id = ss.Subject.Id,
                            Name = ss.Subject.Name
                        })
                        .ToList()
                }).ToList();
        }

        public async Task<Student> GetStudentByEmailAsync(string mail)
        {
            return await _studentRepository.GetByMailAsync(mail);
        }

        public async Task<List<SubjectDto>> GetSubject(int idStudent)
        {
            var subjectStudent = await _studentRepository.GetByIdWithSubjectAsync(idStudent);
            if (subjectStudent == null)
                throw new Exception("Estudiante no encontrado");
            return subjectStudent.StudentSubjects.Select(ss => new SubjectDto
            {
                Id = ss.Subject.Id,
                Name = ss.Subject.Name , 
                Credits = ss.Subject.Credits,
                ProfessorName = ss.Subject.Professor.Name
            }).ToList();
        }


        public async Task<Student> RegisterStudentAsync(string name, string email, List<int> subjectIds)
        {
            if(name.Trim().Length == 0)
                throw new AppException("El nombre del estudiante no puede estar vacío.");
            if (email.Trim().Length == 0)
                throw new AppException("El email del estudiante no puede estar vacío.");
           /* if (subjectIds.Count != 3)
                throw new AppException ("El estudiante debe seleccionar exactamente 3 materias.");         */  


            var student = new Student { Name = name, Email = email };
                if (subjectIds.Count != 0) { 
                var subjects = await _subjectRepository.GetByIdsAsync(subjectIds);
            if (subjects.Count != 3)
                throw new AppException("Una o más materias no existen.");
            foreach (var subject in subjects)
            {
                student.StudentSubjects.Add(new StudentSubject
                {
                    SubjectId = subject.Id,
                    Student = student
                });
            } 
            }
            await _studentRepository.AddAsync(student);
            return student;
        }
    }
}
