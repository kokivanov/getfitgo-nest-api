export enum Authorities {
    SeePublic = 1 << 0,
    ManageSelf = 1 << 1,
    ManagePersonalMessanges = 1 << 2,
    ManagePersonalTrainings = 1 << 3,
    ManagePersonalExercises = 1 << 4,
    ManagePersonalData = 1 << 5,
    ManagePersonalReminders = 1 << 6,
    ManagePersonalCalendars = 1 << 7,
    ManagePersonalChats = 1 << 8,
    ManagePersonalShared = 1 << 9,
    ManagePersonalClubMembership = 1 << 10,
    ManagePersonalArticles = 1 << 11,
    ManagePersonalHighscores = 1 << 12,
    ManagePersonalDiet = 1 << 13,
    ManagePersonalMeals = 1 << 14,
    ManagePersonalArchives = 1 << 15,




    ALL = 0b1111111111111111111111111111111111111111
}