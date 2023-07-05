import { useState, useCallback } from "react";

interface ErrorProp {
  field: string;
  message: string;
}

export default function useErrors() {
  const [errors, setErrors] = useState<ErrorProp[]>([]);

  const setError = useCallback(
    ({ field, message }: ErrorProp) => {
      const errorAlreadyExists = errors.find(
        (error: ErrorProp) => error.field === "email"
      );

      if (errorAlreadyExists) {
        return;
      }
      setErrors((prevState) => [...prevState, { field, message }]);
    },
    [errors]
  );

  const removeError = useCallback((fieldName: string) => {
    setErrors((prevState) =>
      prevState.filter((error) => error.field !== fieldName)
    );
  }, []);

  const getErrorMenssageByFieldName = useCallback(
    (fieldName: string) =>
      errors.find((error) => error.field === fieldName)?.message,
    [errors]
  );

  return {
    setError,
    removeError,
    getErrorMenssageByFieldName,
    errors,
  };
}
