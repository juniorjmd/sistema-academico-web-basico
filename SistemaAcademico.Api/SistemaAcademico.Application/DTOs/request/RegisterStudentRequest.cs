using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Application.DTOs.request
{
    public class RegisterStudentRequest
    {
        public int id {  get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public List<int> SubjectIds { get; set; } = new();
    }
}
