using Microsoft.EntityFrameworkCore;
using SistemaAcademico.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaAcademico.Infrastructure.Persistence
{
    public class SisAcademicoDbContext:DbContext
    {
        public SisAcademicoDbContext(DbContextOptions<SisAcademicoDbContext> options)
        : base(options)
        {
        }


        public DbSet<Student> Students => Set<Student>();
        public DbSet<Professor> Professors => Set<Professor>();
        public DbSet<Subject> Subjects => Set<Subject>();
        public DbSet<StudentSubject> StudentSubjects => Set<StudentSubject>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StudentSubject>()
                .HasKey(ss => new { ss.StudentId, ss.SubjectId });

            base.OnModelCreating(modelBuilder);
        }
    }
}
