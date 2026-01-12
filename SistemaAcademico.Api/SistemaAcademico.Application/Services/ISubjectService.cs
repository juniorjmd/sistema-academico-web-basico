using SistemaAcademico.Application.DTOs.Models;
using SistemaAcademico.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Application.Services
{
    public interface ISubjectService
    {
        
            Task<List<SubjectDto>> GetAllAsync();
         
    }
}
