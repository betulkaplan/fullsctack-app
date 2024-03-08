export interface ToDo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created: {
    by: string;
    date: string;
  };
  tags: string[];
}
