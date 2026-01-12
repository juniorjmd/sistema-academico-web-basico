using SistemaAcademico.Application.DTOs.Models;
using SistemaAcademico.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Application.Services
{
    public interface IStudentService
    {
        Task<Student> RegisterStudentAsync(string name, string email, List<int> subjectIds);
       Task<Student> RegisterStudentSubjectsAsync(int id, List<int> subjectIds);

        Task<List<StudentPartnerDto>> GetPartners(int idStudent);
        Task<List<SubjectDto>> GetSubject(int idStudent);
        Task<Student> GetStudentByEmailAsync(string mail);
    }
}
