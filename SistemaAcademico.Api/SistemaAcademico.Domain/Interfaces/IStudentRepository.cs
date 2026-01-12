using SistemaAcademico.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Domain.Interfaces
{
    public interface   IStudentRepository : IRepository<Student>
    {
        Task<List<Student>> GetPartnersAsync(int studentId);

        Task<Student> GetByIdWithSubjectAsync(int id);
        Task<Student> GetByMailAsync(string mail);
    }
}
