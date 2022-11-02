/* eslint-disable @typescript-eslint/no-explicit-any */
//아이디
/*  export const validateID = (_useCallback: any) => {
	return _useCallback(({ _, value }: any) => {
		if (!value) {
			return Promise.reject(new Error('아이디를 입력해주세요.'));
		}
		if (/\s/.test(value)) {
			return Promise.reject(new Error('아이디는 공백을 포함 할 수 없습니다.'));
		}

		if (value.length < 5 || value.length > 10) {
			return Promise.reject(new Error('아이디는 5 ~ 10자 입니다.'));
		}
		const regExp = /[^a-zA-Z0-9]/;
		if (regExp.test(value)) {
			return Promise.reject(new Error('닉네임은 영문과 숫자만 사용할 수 있습니다.'));
		}
		return Promise.resolve();
	}, []);
}; */

//이메일
export const validateEmail = (_useCallback: any) => {
	return _useCallback(({ _, value }: any) => {
		if (!value) {
			return Promise.reject(new Error('이메일을 입력해주세요.'));
		}
		if (/\s/.test(value)) {
			return Promise.reject(new Error('이메일은 공백을 포함 할 수 없습니다.'));
		}
		if (value.length > 20) {
			return Promise.reject(new Error('이메일은 20자 이하로 입력해주세요.'));
		}
		const regExp =
			/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		if (!regExp.test(value)) {
			return Promise.reject(new Error('이메일 형식이 아닙니다.'));
		}
		return Promise.resolve();
	}, []);
};

// 비밀번호
export const validatePW = (_useCallback: any) => {
	return _useCallback(({ _, value }: any) => {
		const regExp =
			// eslint-disable-next-line no-useless-escape
			/(?=.*\d{1,15})(?=.*[~`!@#$%\^&*()-+=]{1,15})(?=.*[a-z]{1,15})(?=.*[A-Z]{1,15}).{8,15}$/;
		if (!value) {
			return Promise.reject(new Error('비밀번호를 입력해주세요.'));
		}
		if (/\s/.test(value)) {
			return Promise.reject(new Error('비밀번호는 공백을 포함 할 수 없습니다.'));
		}
		if (value.length < 8 || value.length > 15) {
			return Promise.reject(new Error('비밀번호는 8 ~ 15자 입니다.'));
		}
		if (!regExp.test(value)) {
			return Promise.reject(
				new Error('비밀번호는 영문 소문자, 영문 대문자, 숫자, 특수문자를 모두 포함해야 합니다.'),
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
	validate: ({ getFieldValue, value }: any) => {
		if (!value || getFieldValue('password') === value) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
	},
};

/* 
//닉네임
export const validateName = (value: any) => {
	const regExp = /[가-힣]/g;
	if (!value) {
		return Promise.reject(new Error('닉네임을 입력해주세요.'));
	}
	if (/\s/.test(value)) {
		return Promise.reject(new Error('닉네임은 공백을 포함 할 수 없습니다.'));
	}
	if (value.length < 2 || value.length > 8) {
		return Promise.reject(new Error('닉네임은 2 ~ 8자 입니다.'));
	}

	if (!regExp.test(value)) {
		return Promise.reject(new Error('닉네임은 한글만 사용할 수 있습니다.'));
	}
	return Promise.resolve();
};
 */

//아이디
/* export const validateID = (_useCallback: any) => {
	return _useCallback(({ _, value }: any) => {
		if (!value) {
			return Promise.reject(new Error('아이디를 입력해주세요.'));
		}
		if (/\s/.test(value)) {
			return Promise.reject(new Error('아이디는 공백을 포함 할 수 없습니다.'));
		}

		if (value.length < 5 || value.length > 10) {
			return Promise.reject(new Error('아이디는 5 ~ 10자 입니다.'));
		}
		const regExp = /[^a-zA-Z0-9]/;
		if (regExp.test(value)) {
			return Promise.reject(new Error('닉네임은 영문과 숫자만 사용할 수 있습니다.'));
		}
		return Promise.resolve();
	}, []);
};
 */
