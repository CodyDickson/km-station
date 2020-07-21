import { random } from "../random.js";
import { CharStore } from '../store.js';

export function worldContent(name, gender) {
    let activityContent = '';
    // How many memories the character gains
    let memories = 0;
    // What job stat increases
    let job = 0;
    let chance = random(1,2);
    if (chance == 1) {
        chance = random(1,4);
        if (chance == 1) {
            // Fail
            activityContent += 'The world beyond the Station was chaotic and everchanging. ' + name + ' was confronted with new, strange sights everyday – but immediate and sudden memory loss once they crossed back through the invisible barrier.';
        } else if (chance == 2) {
            // Fail
            activityContent += name + ' became enthralled with a particular path constructed of small, round stones. Unfortunately, the path formed a complete circle and led nowhere.';
        } else if (chance == 3) {
            // Fail
            activityContent += 'The world shifted silently, turning each waking hour into a mental maze requiring attention. Although ' + name + ' tried to focus and explore the world, their mind and memories spiraled into confusion. Time and effort were wasted.';
        }
    } else {
        //
    }
    return activityContent;
}