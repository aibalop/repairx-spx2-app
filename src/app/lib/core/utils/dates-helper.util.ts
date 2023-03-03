export interface IRangeDates {
    fromDate: number;
    toDate: number;
}

export class DatesHelper {
    static getTimeRangeForCurrentMonth(): IRangeDates {
        const fromDate = new Date();
        fromDate.setDate(1);
        fromDate.setHours(0, 0, 0, 0);
        const toDate = new Date();
        toDate.setHours(23, 59, 59, 0);
        return { fromDate: fromDate.getTime(), toDate: toDate.getTime() };
    }

    static getTimeRangeForTwoMonthsAgo(): IRangeDates {
        const fromDate = new Date();
        fromDate.setHours(0, 0, 0, 0);
        fromDate.setMonth(fromDate.getMonth() - 2);
        const toDate = new Date();
        toDate.setHours(23, 59, 59, 0);
        return { fromDate: fromDate.getTime(), toDate: toDate.getTime() };
    }

    static getTimeRangeForTwoSixMonthsAgo(): IRangeDates {
        const fromDate = new Date();
        fromDate.setHours(0, 0, 0, 0);
        fromDate.setMonth(fromDate.getMonth() - 6);
        const toDate = new Date();
        toDate.setHours(23, 59, 59, 0);
        return { fromDate: fromDate.getTime(), toDate: toDate.getTime() };
    }
}
