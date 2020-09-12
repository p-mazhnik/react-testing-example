import initStoryshots, {Stories2SnapsConverter} from '@storybook/addon-storyshots';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const converter = new Stories2SnapsConverter();

initStoryshots({
  test: ({ story, context }) => {
    const snapshotFileName = converter.getSnapshotFileName(context);
    const storyElement = story.render();
    const mountTree = mount(storyElement);

    if (snapshotFileName) {
      expect(toJson(mountTree)).toMatchSpecificSnapshot(snapshotFileName);
    }
  },
});
