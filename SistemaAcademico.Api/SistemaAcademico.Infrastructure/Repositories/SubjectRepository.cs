using Microsoft.EntityFrameworkCore;
using SistemaAcademico.Domain.Entities;
using SistemaAcademico.Domain.Interfaces;
using SistemaAcademico.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Infrastructure.Repositories
{
    public class SubjectRepository : Repository<Subject>, ISubjectRepository    
    {
        public SubjectRepository(SisAcademicoDbContext context) : base(context)
        {
        }

        public async Task<List<Subject>> GetByIdsAsync(List<int> ids)
        {
            return await _context.Subjects
                .Include(s => s.Professor)
                .Where(s => ids.Contains(s.Id))
                .ToListAsync();
        }

         public async Task<List<Subject>> GetAllAsync() {
            return await _context.Subjects
               .Include(s => s.Professor) 
               .ToListAsync();
        }
    }
}
