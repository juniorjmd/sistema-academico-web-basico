using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Domain.Entities
{
    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int Credits { get; set; } = 3;

        public int ProfessorId { get; set; }
        public Professor Professor { get; set; } = null!;

        public ICollection<StudentSubject> StudentSubjects { get; set; }
            = new List<StudentSubject>();
    }
}
