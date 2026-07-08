import { FaHeart, FaStar } from "react-icons/fa";
import { LuBell } from "react-icons/lu";
import { GradientIcon } from "../../../../src/System/Icon";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function IconCatalog() {
	return (
		<CatalogPage
			title="Icon"
			description="Applies the system gradient to any react-icons glyph (fill or stroke, auto-detected)."
		>
			<VariantBlock
				label="Gradient icons"
				code={`import { FaHeart, FaStar } from "react-icons/fa";\nimport { LuBell } from "react-icons/lu";\nimport { GradientIcon } from "@suki-suki-club/link-like-ui/System/Icon";\n\n<GradientIcon className="inline-block h-8 w-8" icon={FaHeart} title="Heart" />\n<GradientIcon className="inline-block h-8 w-8" icon={FaStar} title="Star" />\n<GradientIcon className="inline-block h-8 w-8" icon={LuBell} title="Bell" />`}
			>
				<GradientIcon className="inline-block h-8 w-8" icon={FaHeart} title="Heart" />
				<GradientIcon className="inline-block h-8 w-8" icon={FaStar} title="Star" />
				<GradientIcon className="inline-block h-8 w-8" icon={LuBell} title="Bell" />
			</VariantBlock>
		</CatalogPage>
	);
}
