﻿using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;


namespace DAL.Models
{
    public partial class Users : IdentityUser
    {
        public Users()
        {
            TestResults = new HashSet<TestResults>();
            TotalScores = new HashSet<TotalScores>();
        }
       


        public virtual ICollection<TestResults> TestResults { get; set; }
        public virtual ICollection<TotalScores> TotalScores { get; set; }
    }
}
