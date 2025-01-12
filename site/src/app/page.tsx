import CreateCTATopic from '../components/topics/create-cta';
import CreateCTAContextTopic from '../components/topics/create-cta-context';
import CreateCTASelectorTopic from '../components/topics/create-cta-selector';
import ExportTypesTopic from '../components/topics/export-types';
import InstallTopic from '../components/topics/install';
import IntroductionTopic from '../components/topics/introduction';
import ReturnCTAParameterTopic from '../components/topics/return-cta-parameter';
import UseCTATopic from '../components/topics/use-cta';
import SourceCodeRecord from '../components/ui/source-code-record';
import getSourceFiles from '../util/getSourceFiles';

export default async function Home() {
	const sourceCodeRecord = await getSourceFiles();
	return (
		<>
			<SourceCodeRecord sourceCodeRecord={sourceCodeRecord} />
			<IntroductionTopic />
			<section className="z-10 flex flex-col bg-black">
				<InstallTopic />
				<UseCTATopic />
				<CreateCTASelectorTopic />
				<CreateCTATopic />
				<CreateCTAContextTopic />
				<ReturnCTAParameterTopic />
				<ExportTypesTopic />
			</section>
		</>
	);
}
