interface InstituteData {
  code: string;
  name: string;
  district: string;
}

interface Subject {
  subjectCode: string;
  subjectName: string;
  failedType: string;
}

interface Result {
  failedList: Subject[];
  passedList: Subject[];
}

interface SemesterResult {
  publishedAt: string;
  semester: string;
  result: string| Result;
  passed: boolean;
}

export interface ResultResponse {
  success: boolean;
  time: string;
  roll: string;
  regulation: string;
  exam: string;
  instituteData: InstituteData;
  resultData: SemesterResult[];
}
