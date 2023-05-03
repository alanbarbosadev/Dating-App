﻿namespace DatingAppAPI.Extensions
{
    public static class DateTimeExtension
    {
        public static int CalculateAge(this DateTime birthday)
        {
            var today = DateTime.Today;

            var age = today.Year - birthday.Year;

            if (birthday.Date > today.AddYears(-age)) age--;

            return age;

        }
    }
}
