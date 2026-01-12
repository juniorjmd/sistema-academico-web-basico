using SistemaAcademico.Application.DTOs.Models;
using SistemaAcademico.Domain.Entities;
using SistemaAcademico.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Application.Services
{
    public class ProfessorService : IProfessorService
    {
        private readonly IProfessorRepository _professorRepository;

        public ProfessorService(IProfessorRepository professorRepository)
        {
            _professorRepository = professorRepository;
        }

        public async Task<List<ProfessorDto>> GetAllAsync()
        {
            var professors =  await _professorRepository.GetAllAsync();


            return professors.Select(p=> new ProfessorDto 
            { 
                Id = p.Id,
                Name = p.Name,
                Subjects = p.Subjects?.Select(s=> new SubjectDto {
                Id = s.Id ,
                Name = s.Name,
                Credits = s.Credits
                }).ToList()
            }).ToList();
        }
         
    }
}
