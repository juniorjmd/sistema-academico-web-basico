using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Domain.Entities
{
    public class Professor
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public ICollection<Subject> Subjects { get; set; }
            = new List<Subject>();
    }
}
