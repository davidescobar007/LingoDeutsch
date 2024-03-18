"use client"

import { useQuery } from "@tanstack/react-query"

import { getSingleQuizz } from "@/modules/actions/quizzes.actions"

export const useGetQuiz = (id: string) => {
   return useQuery({ queryKey: ["quizKey", id], queryFn: () => getSingleQuizz(id) })
}
