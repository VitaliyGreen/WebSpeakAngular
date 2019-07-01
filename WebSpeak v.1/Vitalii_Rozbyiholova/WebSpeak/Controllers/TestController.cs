﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Models;
using DAL.Repositories;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Mvc;
using SmartBreadcrumbs.Attributes;
using WebSpeak.Models;
using DAL;
using Microsoft.EntityFrameworkCore;

namespace WebSpeak.Controllers
{
    public class TestController : Controller
    {
        private readonly SessionHelper _helper;
        private readonly ProductHouseContext _db;

        private int NativeLanguageId { get; }
        private int LearningLanguageId { get; }

        private int SubcategoryId {
            get
            {
                return _helper.GetLastSubcategoryId();
            }
        }

        private List<DTO> Words {
            get
            {
                WordsRepository wordsRepository = new WordsRepository();
                return wordsRepository.GetDTO(NativeLanguageId, LearningLanguageId, SubcategoryId);
            }
        }

        public TestController(SessionHelper helper)
        {
            this._helper = helper;
            this._db = new ProductHouseContext();

            Tuple<int, int> ids = helper.GetLanguagesId();
            NativeLanguageId = ids.Item1;
            LearningLanguageId = ids.Item2;
        }

        [Breadcrumb("Tests", FromAction = "SubCategories", FromController = typeof(HomeController))]
        public async Task<IActionResult> Index(int subcategoryId)
        {
            int idToUse = subcategoryId;
            if(idToUse > 0)
            {
                _helper.SetSubcategory(subcategoryId);
            }

            TestsRepository testsRepository = new TestsRepository();
            
            List<DTO> DTOs = await Task.Run(() => testsRepository.GetDTO(NativeLanguageId, LearningLanguageId));
            return View(DTOs);
        }

        [Breadcrumb("Testing", FromAction = nameof(Index), FromController = typeof(TestController))]
       public IActionResult Test(int testID)
       {
           int idToUse = testID;
           if (idToUse > 0)
           {
               _helper.SetTest(idToUse);
           }
           string viewName = String.Format("Test{0}", testID);
           return View(viewName, Words);
        }

      
       public IActionResult SaveChanges(int score)
       {
           string userId = User.Claims.First().Value;
           if (userId != null)
           {
               int testId = _helper.GetLastTestId();
               int categoryId = _helper.GetLastSubcategoryId();
               int langId = _helper.GetLanguagesId().Item2;

               using (_db)
               {
                   TestResults oldResults;
                   bool isDone = IsTestDoneOnce(userId, testId, langId, categoryId, out oldResults);
                   if (isDone)
                   {
                       int oldScore = oldResults.Result;
                       if (score > oldScore)
                       {
                           oldResults.Result = score;
                           oldResults.TestDate = DateTime.Now;
                           _db.Entry(oldResults).State = EntityState.Modified;
                       }
                   }
                   else
                   {
                       TestResults results = new TestResults
                       {
                           TestId = testId,
                           Result = score,
                           UserId = userId,
                           CategoryId = categoryId,
                           LangId = langId,
                           TestDate = DateTime.Now
                       };
                        _db.TestResults.Add(results);
                   }
                   _db.SaveChanges();
               }
           }
           return RedirectToAction("Index");
       }

       private bool IsTestDoneOnce(string userId, int testId, int langId, int categoryId, out TestResults oldResults)
       {
           oldResults = null;
           TestResults results = null;
           try
           {
               results = _db.TestResults.First(r => r.UserId == userId &&
                                                    r.TestId == testId &&
                                                    r.CategoryId == categoryId &&
                                                    r.LangId == langId);
           }
           catch (InvalidOperationException)
           {
               Console.WriteLine("New test result");
           }
           catch
           {
               throw;
           }

           if (results != null)
           {
               oldResults = results;
               return true;
           }
           else { return false; }
       }
    }
}