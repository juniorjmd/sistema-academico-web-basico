using Microsoft.EntityFrameworkCore;
using SistemaAcademico.Domain.Entities;
using SistemaAcademico.Domain.Interfaces;
using SistemaAcademico.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Infrastructure.Repositories
{
    public  class ProfessorRepository : Repository<Professor>, IProfessorRepository
        
    {
        public ProfessorRepository(SisAcademicoDbContext context) : base(context)
        {
        }

        public override async Task<List<Professor>> GetAllAsync()
        { 
            return await _context.Professors.Include(p=> p.Subjects).ToListAsync(); 
        }
    }
}
