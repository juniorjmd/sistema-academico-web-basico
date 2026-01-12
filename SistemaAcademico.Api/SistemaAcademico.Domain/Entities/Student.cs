using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Domain.Entities
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;

       public ICollection<StudentSubject> StudentSubjects { get; set; }
            = new List<StudentSubject>(); 
    }
}
