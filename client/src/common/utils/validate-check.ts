//이메일
export const validateEmail = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_useCallback: (arg0: (_: any, value: any) => Promise<void>, arg1: never[]) => any,
) => {
	return _useCallback((_, value) => {
		const regExp =
			/^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

		if (!value) {
			return Promise.reject(new Error('이메일을 입력해주세요.'));
		}
		if (/\s/.test(value)) {
			return Promise.reject(new Error('이메일은 공백을 포함 할 수 없습니다.'));
		}
		if (!regExp.test(value)) {
			return Promise.reject(new Error('이메일 형식이 아닙니다.'));
		}
		return Promise.resolve();
	}, []);
};

// 비밀번호
export const validatePW = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_useCallback: (arg0: (_: any, value: any) => Promise<void>, arg1: never[]) => any,
) => {
	return _useCallback((_, value) => {
		const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{10,20}$/;

		if (!value) {
			return Promise.reject(new Error('비밀번호를 입력해주세요.'));
		}
		if (/\s/.test(value)) {
			return Promise.reject(new Error('비밀번호는 공백을 포함 할 수 없습니다.'));
		}
		if (value.length < 10 || value.length > 20) {
			return Promise.reject(new Error('비밀번호는 10 ~ 20자 입니다.'));
		}
		if (!regExp.test(value)) {
			return Promise.reject(
				new Error('비밀번호는 영문 대문자/소문자, 숫자, 특수문자를 모두 포함해야 합니다.'),
			);
		}
		return Promise.resolve();
	}, []);
};

//비밀번호 재확인
export const validatePWCheck = {
	options: {
		required: true,
		message: '비밀번호 재확인을 입력해주세요.',
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	validate: (getFieldValue: (arg0: string) => any, value: any) => {
		if (!value || getFieldValue('password') === value) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
	},
};

//닉네임
export const validateName = (value: string) => {
	const regExp = /^[가-힣a-zA-Z]+$/;

	if (!value) {
		return Promise.reject(new Error('닉네임을 입력해주세요.'));
	}
	if (/\s/.test(value)) {
		return Promise.reject(new Error('닉네임은 공백을 포함 할 수 없습니다.'));
	}
	if (value.length < 2 || value.length >= 20) {
		return Promise.reject(new Error('닉네임은 2 ~ 20자 입니다.'));
	}
	if (!regExp.test(value)) {
		return Promise.reject(new Error('닉네임은 영문,한글만 사용할 수 있습니다.'));
	}
	return Promise.resolve();
};
