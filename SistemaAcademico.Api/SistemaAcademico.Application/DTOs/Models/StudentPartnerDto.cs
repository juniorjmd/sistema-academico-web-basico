using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Application.DTOs.Models
{
    public class StudentPartnerDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public List<SubjectDto> sharedSubjects { get; set; } = new();
    }
}
