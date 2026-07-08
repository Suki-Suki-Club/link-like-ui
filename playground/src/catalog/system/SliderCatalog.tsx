import { useState } from "react";
import { SliderRow, SliderToggleRow } from "../../../../src/System/Slider";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function SliderCatalog() {
	const [volume, setVolume] = useState<number>(60);
	const [bgm, setBgm] = useState<number>(40);
	const [muted, setMuted] = useState<boolean>(false);

	return (
		<CatalogPage
			title="Slider"
			description="Labelled slider row, optionally with a leading mute Toggle (SliderToggleRow)."
		>
			<VariantBlock
				label="SliderRow"
				code={`import { SliderRow } from "@suki-suki-club/link-like-ui/System/Slider";\n\n<SliderRow label="Volume" value={volume} onValueChange={setVolume} />`}
			>
				<div className="w-80">
					<SliderRow
						label="Volume"
						value={volume}
						onValueChange={setVolume}
					/>
				</div>
			</VariantBlock>

			<VariantBlock
				label="SliderToggleRow"
				code={`import { SliderToggleRow } from "@suki-suki-club/link-like-ui/System/Slider";\n\n<SliderToggleRow\n  label="BGM"\n  value={bgm}\n  onValueChange={setBgm}\n  pressed={muted}\n  onPressedChange={setMuted}\n  toggleAriaLabel="Toggle BGM"\n/>`}
			>
				<div className="w-80">
					<SliderToggleRow
						label="BGM"
						value={bgm}
						onValueChange={setBgm}
						pressed={muted}
						onPressedChange={setMuted}
						toggleAriaLabel="Toggle BGM"
					/>
				</div>
			</VariantBlock>
		</CatalogPage>
	);
}
