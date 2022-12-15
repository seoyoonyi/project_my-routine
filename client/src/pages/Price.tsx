import Item from 'antd/lib/list/Item';
import { ArrowRight, Check, HelpCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Btn from '../components/Btn';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainContainer from '../components/MainContainer';

const Price = () => {
	const [clickQuestion, setClickQuestion] = useState<boolean>(false);
	const pricePlans = [
		{
			title: '무료',
			content: '에고루틴 회원인\n 모든 이용자',
			price: '0',
		},
		{
			title: '학생',
			content: '중.고등학생 및 동일연령 청소년,\n대학생, 대학원생',
			price: '2,000',
		},
		{
			title: '프로',
			content: '학생 외 개인 사용자\n 개인 사업자, 자영업자',
			price: '3,900',
		},
	];

	const routineSkills = [
		{
			title: '루틴 기능',
			content: [
				'"언제할래요?" 설정',
				'루틴 이모지 커스텀',
				'루틴 신호등',
				'월간 신호등 통계',
				'짧은 메모',
				'주차별 루틴 회고',
				'요일 반복 루틴',
				'주 n회 반복루틴',
				'예약 루틴',
				'긴 메모',
				'비공개 루틴',
			],
		},
		{
			title: '회고 기능',
			content: ['데일리 회고 작성', '데일리 회고 이모지', '회고 항목 커스텀', '비공개 회고'],
		},
		{
			title: '특별 기능',
			content: ['휴식 기능', '계정 비공개', '광고 제거'],
		},
	];

	const routineQuestions = [
		{
			id: '1',
			question: '결제 전에 무료로 체험해볼 수 있나요?',
			answer:
				'이메일 발송을 위한 대부분의 기능은 무료로 제공 중인 스타터 요금제에서도 사용해볼 수 있습니다. 스타터 요금제는 회원가입만 하면 바로 사용할 수 있습니다. 회원가입하고 바로 스티비를 경험해보세요.',
		},
		{
			id: '2',
			question: '구독자가 뭔가요?',
			answer:
				'스티비에서는 이메일의 발송 대상이 되는 이메일 수신자를 구독자로 표현하고 있습니다. 예를 들면 고객, 회원들에 대한 정보를 구독자로 등록하여 이메일을 보낼 수 있습니다. 계정에 등록된 전체 구독자 수를 기준으로 요금제가 결정됩니다. 수신거부, 자동삭제, 다른 주소록에 중복으로 등록된 구독자는 자동으로 구독자 수 계산에서 제외됩니다.',
		},
		{
			id: '3',
			question: '결제는 어떻게 하나요?',
			answer:
				'회원가입 후 직접 결제하여 사용할 수 있습니다. 결제 수단은 카드 결제와 계좌이체를 지원합니다. 매월 정기결제가 되는 월간 결제는 카드 결제만 가능합니다. 12개월 요금을 한 번에 결제하는 연간 결제는 카드 결제와 계좌이체로 이용할 수 있습니다. 계좌이체로 진행하는 경우에는 세금계산서를 발급해드립니다. 결제 방법에 대한 자세한 내용은 아래 도움말을 참고해주세요.',
		},
		{
			id: '4',
			question: '환불 정책이 어떻게 되나요?',
			answer:
				'이메일 발송, 예약 여부와 계약 경과일에 따라 환불 여부와 금액이 달라집니다. 환불은 스티비 서비스 내 채팅 문의를 통해 신청할 수 있습니다.',
		},
	];

	const sellingPoint = [
		'사이트가 없어도 데모가능',
		'신용카드 등록없이 무료 사용',
		'3분이면 충분한 설치',
	];

	return (
		<>
			<Header />
			<MainContainer>
				{/* 에고루틴 프로 멤버십 */}
				<div>
					<div className="pb-10 text-center">
						<h2 className="text-3xl font-semibold">에고루틴 프로 멤버십</h2>
						<p className="pt-4">무료로 시작하고, 성장하면 그때 업그레이드 하세요.</p>
					</div>

					<div className="flex w-full mt-5 border">
						{pricePlans.map((item) => {
							return (
								<div
									key={item.title}
									className="flex flex-col items-center justify-between w-1/3 px-5 py-8 [&:nth-child(2)]:border-x"
								>
									<div className="flex flex-col items-center">
										<h3 className="text-2xl font-semibold text-gray-800">{item.title}</h3>
										<p className="mt-1 text-xs text-center whitespace-pre-line">{item.content}</p>
									</div>
									<div className="flex items-end my-6">
										<p className="text-3xl font-semibold text-gray-800">{item.price}</p>
										<span className="pb-1 text-sm font-semibold">원</span>
									</div>
									<Btn type="primary" size="large" className="w-full text-sm rounded-md">
										결제하기
									</Btn>
								</div>
							);
						})}
					</div>
				</div>

				{/* 에고루틴 19가지 기능 */}
				<div className="mt-28">
					<div className="text-center">
						<span>무제한 루틴과 함께 이용할 수 있는</span>
						<h2 className="text-3xl font-semibold">19가지 기능</h2>
					</div>
					{routineSkills.map((item) => {
						return (
							<div key={item.title} className="w-2/3 mx-auto mt-10">
								<h3 className="font-semibold text-gray-800">{item.title}</h3>
								<div>
									{item.content.map((content) => {
										return (
											<div
												key={content}
												className="flex items-center justify-between px-1 py-2 border-b"
											>
												<div className="flex items-center">
													<HelpCircle size={16} color="#37e2d5" />
													<p className="pl-2 text-sm">{content}</p>
												</div>
												<Check size={16} color="#37e2d5" />
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>

				{/* 에고루틴 자주 묻는 질문 */}
				<div className="mt-28">
					<h2 className="pb-10 text-3xl font-semibold text-center">자주 묻는 질문</h2>
					{routineQuestions.map((item) => {
						return (
							<div key={item.id} className="py-4 border-b">
								<h3
									onClick={() => setClickQuestion((pre) => !pre)}
									className="font-semibold text-gray-800 cursor-pointer"
								>
									{item.question}
								</h3>
								{clickQuestion && <p className="mt-4 text-sm">{item.answer}</p>}
							</div>
						);
					})}
				</div>
			</MainContainer>
			{/* 에고루틴 셀링 포인트 */}
			<div className="mt-28 bg-[#37e2d5] py-24 flex flex-col items-center">
				<h2 className="pb-5 text-4xl font-semibold text-center text-white">
					써보는게 제일 빠릅니다.
				</h2>
				<div className="flex justify-center">
					{sellingPoint.map((item) => {
						return (
							<div key={item} className="flex items-center [&:nth-child(2)]:px-4">
								<Check size={20} color="#fff" />
								<p className="pl-1 font-semibold text-white">{item}</p>
							</div>
						);
					})}
				</div>
				<Btn
					size="large"
					className="h-auto mt-12 bg-white border-0 rounded-md hover:brightness-125"
				>
					<Link to="/main" className="flex items-center p-2">
						<span className="mr-1 font-semibold text-[#37e2d5]">무료로 시작하기</span>
						<ArrowRight size={18} color="#37e2d5" />
					</Link>
				</Btn>
			</div>
			<Footer />
		</>
	);
};

export default Price;
