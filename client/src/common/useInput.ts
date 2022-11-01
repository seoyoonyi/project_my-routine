/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, Dispatch, SetStateAction } from 'react';

function useInput<T>(
	initialValue: T,
): [
	T,
	(event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
	Dispatch<SetStateAction<T>>,
] {
	const [value, setValue] = useState<typeof initialValue>(initialValue);
	const handleChange = useCallback(({ target: { value } }: any) => {
		setValue(value);
	}, []);
	return [value, handleChange, setValue];
}

export default useInput;
