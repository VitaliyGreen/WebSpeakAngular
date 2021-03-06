﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class TestResultsRepository : IRepository<TestResults>
    {
        private LearningLanguagesContext db;

        public TestResultsRepository()
        {
            this.db = new LearningLanguagesContext(ConfigurateOptions.GetOptions());
        }

        public async void Create(TestResults item)
        {
            await db.TestResults.AddAsync(item);
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<TestResults> GetItem(int id)
        {
            return await db.TestResults.FindAsync(id);
        }

        public async Task<IEnumerable<TestResults>> GetList()
        {
            return await db.TestResults.Include(t => t.Category).ToListAsync();
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(TestResults item)
        {
            throw new NotImplementedException();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public Task<List<DTO>> GetTranslations(int idLangLearn, int idLangNative, int? parentId)
        {
            throw new NotImplementedException();
        }

        public Task<TestResults> GetItem(string value)
        {
            throw new NotImplementedException();
        }

        public IQueryable<TestResults> GetAll()
        {
            return db.TestResults;
        }
    }
}
