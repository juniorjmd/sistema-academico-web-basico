using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Application.DTOs.Models
{
    public class SubjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string ProfessorName { get; set; } = null!;
        public int ProfessorId { get; set; }
        public int Credits { get; set; }
    }
}
