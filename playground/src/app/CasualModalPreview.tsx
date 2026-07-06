import { Button } from "../../../src/System/Button";
import { CasualButton } from "../../../src/System/CasualButton";
import {
	CasualModal,
	CasualModalBody,
	CasualModalClose,
	CasualModalContent,
	CasualModalFooter,
	CasualModalHeader,
	CasualModalLead,
	CasualModalTitle,
	CasualModalTrigger,
} from "../../../src/System/CasualModal";

export function CasualModalPreview() {
	return (
		<CasualModal>
			<CasualModalTrigger asChild>
				<Button size="lg" variant="secondary">
					Open Casual Modal
				</Button>
			</CasualModalTrigger>
			<CasualModalContent aria-describedby={undefined}>
				<CasualModalHeader>
					<CasualModalTitle>サンプル詳細</CasualModalTitle>
				</CasualModalHeader>
				<CasualModalBody>
					<CasualModalLead>
						追加される項目は以下のとおりです。
					</CasualModalLead>
					<p className="mt-4 font-bold">
						このセクションはレイアウト確認用のサンプルテキストです。実際の文言とは関係のない、当たり障りのない説明文をここに表示しています。
					</p>
					<p className="mt-3 font-bold">
						二つ目の段落です。長さの異なる文章を並べて、行間や余白の見え方を確認します。
					</p>
				</CasualModalBody>
				<CasualModalFooter>
					<CasualModalClose asChild>
						<CasualButton variant="secondary">もどる</CasualButton>
					</CasualModalClose>
				</CasualModalFooter>
			</CasualModalContent>
		</CasualModal>
	);
}
