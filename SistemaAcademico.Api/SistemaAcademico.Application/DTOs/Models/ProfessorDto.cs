using SistemaAcademico.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Application.DTOs.Models
{
    public class ProfessorDto
    {
        
            public int Id { get; set; }
            public string Name { get; set; } = null!;

            public List<SubjectDto> Subjects { get; set; }    = new ();
        
    }
}
