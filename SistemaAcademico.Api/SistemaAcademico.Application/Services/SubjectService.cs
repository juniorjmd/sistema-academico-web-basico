using SistemaAcademico.Application.DTOs.Models;
using SistemaAcademico.Domain.Entities;
using SistemaAcademico.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Application.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly ISubjectRepository _subjectRepository;

        public SubjectService(ISubjectRepository subjectRepository)
        {
            _subjectRepository = subjectRepository;
        }

        public async Task<List<SubjectDto>> GetAllAsync()
        {
            var s = await _subjectRepository.GetAllAsync();
            
            return s.Select(s => new SubjectDto
            {
                Id = s.Id,
                Credits = s.Credits,
                Name = s.Name,
                ProfessorId = s.ProfessorId,
                ProfessorName = s.Professor.Name,
            }).ToList();
        }
    }
}
