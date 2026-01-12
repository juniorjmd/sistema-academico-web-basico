using SistemaAcademico.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Domain.Interfaces
{
    public interface ISubjectRepository : IRepository<Subject>
    {
        Task<List<Subject>> GetByIdsAsync(List<int> ids); 
    }
}
