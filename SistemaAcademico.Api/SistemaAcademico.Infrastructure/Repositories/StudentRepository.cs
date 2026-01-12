using Microsoft.EntityFrameworkCore;
using SistemaAcademico.Domain.Entities;
using SistemaAcademico.Domain.Interfaces;
using SistemaAcademico.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Infrastructure.Repositories
{
    public class StudentRepository : Repository<Student>, IStudentRepository
    { 
        public StudentRepository(SisAcademicoDbContext context) : base(context)
        {   
        }

        public async Task<Student> GetByIdWithSubjectAsync(int id)
        {
            return await _context.Students
                .Include(s => s.StudentSubjects)
                .ThenInclude(ss => ss.Subject) 
                .ThenInclude(sub => sub.Professor)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Student> GetByMailAsync(string mail)
        {
            return await _context.Students.FirstOrDefaultAsync(s => 
            s.Email.ToLower().Equals(mail.ToLower())
            )            
            ;
        }

        public async Task<List<Student>> GetPartnersAsync(int studentId)
        {
            var subjectIds = await _context.StudentSubjects
               .Where(ss => ss.StudentId == studentId)
               .Select(ss => ss.SubjectId)
               .ToListAsync();

            var partners = await _context.Students
                .Include(s => s.StudentSubjects)
                .ThenInclude(ss => ss.Subject)
               .Where(s => s.Id != studentId)
               .Where(s => s.StudentSubjects.Any(ss => subjectIds.Contains(ss.SubjectId)))
               .Distinct()
               .ToListAsync();

            return partners;
        }
    }
}
