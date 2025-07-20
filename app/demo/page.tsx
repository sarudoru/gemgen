import { BGPattern } from "@/components/ui/bg-pattern";

export default function DemoPage() {
	return (
		<div className="mx-auto max-w-4xl space-y-5 p-8">
			<div className="text-center mb-8">
				<h1 className="text-4xl font-bold mb-4">BGPattern Component Demo</h1>
				<p className="text-muted-foreground">Showcasing all background pattern variants with different masks</p>
			</div>
			
			<div className="relative flex aspect-video flex-col items-center justify-center rounded-2xl border-2">
				<BGPattern variant="grid" mask="fade-edges" />
				<h2 className="text-3xl font-bold">Grid Background</h2>
				<p className="text-muted-foreground font-mono">With (fade-edges) Mask</p>
			</div>
			
			<div className="relative flex aspect-video flex-col items-center justify-center rounded-2xl border-2">
				<BGPattern variant="dots" mask="fade-center" animated={true} />
				<h2 className="text-3xl font-bold">Dots Background</h2>
				<p className="text-muted-foreground font-mono">With (fade-center) Mask & Animation</p>
			</div>
			
			<div className="relative flex aspect-video flex-col items-center justify-center rounded-2xl border-2">
				<BGPattern variant="diagonal-stripes" mask="fade-y" />
				<h2 className="text-3xl font-bold">Diagonal Stripes</h2>
				<p className="text-muted-foreground font-mono">With (fade-y) Mask</p>
			</div>
			
			<div className="relative flex aspect-video flex-col items-center justify-center rounded-2xl border-2">
				<BGPattern variant="horizontal-lines" mask="fade-right" />
				<h2 className="text-3xl font-bold">Horizontal Lines</h2>
				<p className="text-muted-foreground font-mono">With (fade-right) Mask</p>
			</div>
			
			<div className="relative flex aspect-video flex-col items-center justify-center rounded-2xl border-2">
				<BGPattern variant="vertical-lines" mask="fade-bottom" />
				<h2 className="text-3xl font-bold">Vertical Lines</h2>
				<p className="text-muted-foreground font-mono">With (fade-bottom) Mask</p>
			</div>
			
			<div className="relative flex aspect-video flex-col items-center justify-center rounded-2xl border-2">
				<BGPattern variant="checkerboard" mask="fade-top" />
				<h2 className="text-3xl font-bold">Checkerboard Background</h2>
				<p className="text-muted-foreground font-mono">With (fade-top) Mask</p>
			</div>
		</div>
	);
} 