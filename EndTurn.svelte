<script>
    import { charGenerator } from './Generators/charGenerator.js';
    import { enemyGenerator } from "./Generators/enemyGenerator.js";
    import { animalGenerator, colorGenerator, creativeGenerator, emotionGenerator, familyGenerator, materialGenerator } from './Generators/worldGenerator.js';
    import { CharStore, LogStore, EnemyStore, MainStore, NextRaid, StoryStore, WorldStore } from './store.js';
    import { random } from './random.js';

    const endTurn = () => {
        $MainStore.week += 1;
        let defense = 0;
        let doctoring = 0;
        let logContent = [];
        let content = '';
        for (let x = 0; x < $CharStore.length; x++) {
            if ($CharStore[x].health > 0) {
                ///// JOBS /////
                let job = document.getElementById("job" + (x + 1)).options.selectedIndex;
                let chance = random(0,101);
                // Defender
                if (job == 0) {
                    defense += $CharStore[x].fighting;
                    content += $CharStore[x].name + ' defended KM-Station. ';
                }
                // Scavenger
                if (job == 1 && $CharStore[x].scavenging < 5 && chance > 75) {
                    $MainStore.resources += 3;
                    content += $CharStore[x].name + ' gathered resources (+3). Critical Success! ';
                    $CharStore[x].scavenging += 1;
                } else if (job == 1 && $CharStore[x].scavenging < 5 && chance <= 75) {
                    $MainStore.resources += 1;
                    content += $CharStore[x].name + ' gathered resources (+1). ';
                } else if (job == 1 && $CharStore[x].scavenging >= 5 && $CharStore[x].scavenging < 10 && chance > 75) {
                    $MainStore.resources += 5;
                    content += $CharStore[x].name + ' gathered resources (+5). Critical Success! ';
                    $CharStore[x].scavenging += 1;
                } else if (job == 1 && $CharStore[x].scavenging >= 5 && $CharStore[x].scavenging < 10 && chance <= 75) {
                    $MainStore.resources += 3;
                    content += $CharStore[x].name + ' gathered resources (+3). ';
                } else if (job == 1 && $CharStore[x].scavenging >= 10 && chance > 75) {
                    $MainStore.resources += 7;
                    content += $CharStore[x].name + ' gathered resources (+7). Critical Success! ';
                    if ($CharStore[x].scavenging < 15) {
                        $CharStore[x].scavenging += 1;
                    }
                } else if (job == 1 && $CharStore[x].scavenging >= 10 && chance <= 75) {
                    $MainStore.resources += 5;
                    content += $CharStore[x].name + ' gathered resources (+5). ';
                }
                // Doctor
                if (job == 2 && $CharStore[x].doctoring < 5 && chance > 75) {
                    doctoring += 2;
                    content += $CharStore[x].name + ' provided medical support (+2 to all characters). Critical Success! ';
                    $CharStore[x].doctoring += 1;
                } else if (job == 2 && $CharStore[x].doctoring < 5 && chance <= 75) {
                    doctoring += 1;
                    content += $CharStore[x].name + ' provided medical support (+1 to all characters). ';
                } else if (job == 2 && $CharStore[x].doctoring >= 5 && $CharStore[x].doctoring < 10 && chance > 75) {
                    doctoring += 3;
                    content += $CharStore[x].name + ' provided medical support (+3 to all characters). Critical Success! ';
                    $CharStore[x].doctoring += 1;
                } else if (job == 2 && $CharStore[x].doctoring >= 5 && $CharStore[x].doctoring < 10 && chance <= 75) {
                    doctoring += 2;
                    content += $CharStore[x].name + ' provided medical support (+2 to all characters). ';
                } else if (job == 2 && $CharStore[x].doctoring >= 10 && chance > 75) {
                    doctoring += 4;
                    content += $CharStore[x].name + ' provided medical support (+4 to all characters). Critical Success! ';
                    if ($CharStore[x].doctoring < 15) {
                        $CharStore[x].doctoring += 1;
                    }
                } else if (job == 2 && $CharStore[x].doctoring >= 10 && chance <= 75) {
                    doctoring += 3;
                    content += $CharStore[x].name + ' provided medical support (+3 to all characters). ';
                }
                // Student
                if (job == 3) {
                    let option = random(1,4);
                    if (option == 1 && $CharStore[x].fighting < 15) {
                        $CharStore[x].fighting += 1;
                        content += $CharStore[x].name + ' studied Fighting (' + $CharStore[x].fighting + '). ';
                    } else if (option == 2 && $CharStore[x].scavenging < 15) {
                        $CharStore[x].scavenging += 1;
                        content += $CharStore[x].name + ' studied Scavenging (' + $CharStore[x].scavenging + '). ';
                    } else if (option == 3 && $CharStore[x].doctoring < 15) {
                        $CharStore[x].doctoring += 1;
                        content += $CharStore[x].name + ' studied Doctoring (' + $CharStore[x].doctoring + '). ';
                    } else {
                        content += $CharStore[x].name + ' failed in their studies. ';
                    }
                }
                ///// ACTIVITIES /////
                let activityList = document.querySelector("#activity" + (x + 1));
                let activity = activityList.value;
                let activityChance;
                let temp = '';
                //
                if (activity == 'Explore the Unknown World') {
                    activityChance = random(1,28);
                    if (activityChance == 1) {
                        temp = colorGenerator();
                        content += 'They wandered the world and found a flower with ' + temp + ' petals. As they approached the flower for closer inspection, they felt the ground begin to tremble. Hundreds of flowers with ' + temp + ' petals began to sprout all around their feet. The ground erupted, split open under pressure, and then - as suddenly as it had started, it stopped. The field of ' + temp + ' flowers was still, their only motion given by the wind. ';
                        if ($CharStore[x].obsession == temp) {
                            content += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them.';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 2) {
                        temp = animalGenerator();
                        content += 'They explored the world and came across a group of ' + temp + ' which filled them with a sense of ' + emotionGenerator() + ' whenever they went near them. ';
                        if ($CharStore[x].obsession == temp) {
                            content += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them.';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 3) {
                        content += 'They explored the world and found a statue of their ' + familyGenerator() + '.  The haunting visage kept them awake for three nights. ';
                    } else if (activityChance == 4) {
                        temp = creativeGenerator();
                        content += 'They explored the world and were overwhelmed with the desire to ' + temp + '. ';
                        if ($CharStore[x].obsession == temp) {
                            content += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them. ';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 5) {
                        temp = colorGenerator();
                        content += 'They explored the world and found themselves lost in a field of ' + colorGenerator() + ' flowers. They tried to pick one and found the petals had teeth. ';
                        if ($CharStore[x].obsession == temp) {
                            content += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them. ';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 6) {
                        temp = animalGenerator();
                        content += 'They explored the world and were chased away by a group of ' + temp + '. One of them had a face that was reminiscent of their ' + familyGenerator() + '. ';
                        if ($CharStore[x].obsession == temp) {
                            content += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them.';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 7) {
                        temp = emotionGenerator();
                        content += 'They searched a nearby abandoned building and caught their finger on a nail. Their brain was flooded with a sense of ' + temp + ' as the blood started to drip onto the dusty wooden floor. ';
                        if ($CharStore[x].obsession == temp) {
                            content += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them. ';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 8) {
                        content += 'While searching a nearby town, they found an old VHS player attached to a TV. They tested the remote and surprisingly, it worked. Home movies featuring ' + $CharStore[x].name + ' and their ' + familyGenerator() + ' started playing on an endless loop. ';
                    } else if (activityChance == 9) {
                        temp = emotionGenerator();
                        content += "After sneaking off to take a nap inside a hunter's cabin, they were woken up by a massive red truck crashing through the wall. Just as it was about to run " + $CharStore[x].name + " over, it phased out of reality and left nothing except a strong wind, a hole in the wall, and the overwhelming feeling of " + temp + ". ";
                        if ($CharStore[x].obsession == temp) {
                            content += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them. ';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 10) {
                        temp = animalGenerator();
                        content += 'A thundering crash echoed through the area. ' + $CharStore[x].name + ' decided to investigate and discovered a library sticking out of the side of a mountain. They lifted themselves up with the help of the dripping pipes underneath the building, shattering a window with a rock and then climbing inside. They found row after row of books about ' + temp + '. ';
                        if ($CharStore[x].obsession == temp) {
                            content += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them.';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 11) {
                        temp = colorGenerator();
                        content += 'They explored the world and found a small crack running down the center of a ceramic tile. This tile was especially odd because it was located in the middle of a completely empty field and immovable. Using whatever tool they had closest, ' + $CharStore[x].name + ' hammered the ceramic enough to make the crack an inch wide and several inches long. They leaned down and pressed their eye against the crack, seeing through a slight darkness to discover thousands upon thousands of ' + temp + ' bugs, skittering in all directions. ';
                        if ($CharStore[x].obsession == temp) {
                            content += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them. ';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 12) {
                        content += "While searching the world, they found an old house with a skeleton leaning against the outside wall. It had one hand against the wood and the other hand wrapped around the handle of a scythe. The house looked like it was something out of the 1800's. Investigating further, " + $CharStore[x].name + ' forced the front door open and discovered nearly every inch of the house was filled with ' + materialGenerator() + '. ';
                    } else if (activityChance == 13) {
                        content += 'They explored the world and found a statue of their ' + familyGenerator() + '.  The haunting visage kept them awake for three nights. ';
                    } else if (activityChance == 14) {
                        content += 'They explored the world and found a statue of their ' + familyGenerator() + '.  The haunting visage kept them awake for three nights. ';
                    } else if (activityChance == 15) {
                        content += 'They explored the world and found a statue of their ' + familyGenerator() + '.  The haunting visage kept them awake for three nights. ';
                    } else if (activityChance == 16) {
                        content += 'They explored the world and found a statue of their ' + familyGenerator() + '.  The haunting visage kept them awake for three nights. ';
                    } else if (activityChance == 17) {
                        content += 'They explored the world and found a statue of their ' + familyGenerator() + '.  The haunting visage kept them awake for three nights. ';
                    } else if (activityChance == 18) {
                        content += 'They explored the world and found a statue of their ' + familyGenerator() + '.  The haunting visage kept them awake for three nights. ';
                    } else if (activityChance == 19) {
                        content += 'They explored the world and found a statue of their ' + familyGenerator() + '.  The haunting visage kept them awake for three nights. ';
                    } else if (activityChance == 20) {
                        content += 'They explored the world and found a statue of their ' + familyGenerator() + '.  The haunting visage kept them awake for three nights. ';
                    } else if (activityChance == 21) {
                        content += 'They explored the world and found a statue of their ' + familyGenerator() + '.  The haunting visage kept them awake for three nights. ';
                    } else if (activityChance == 22) {
                        content += 'They explored the world and found a statue of their ' + familyGenerator() + '.  The haunting visage kept them awake for three nights. ';
                    } else if (activityChance == 23) {
                        content += 'They explored the world and found a statue of their ' + familyGenerator() + '.  The haunting visage kept them awake for three nights. ';
                    } else if (activityChance == 24) {
                        content += 'They explored the world and found a statue of their ' + familyGenerator() + '.  The haunting visage kept them awake for three nights. ';
                    } else if (activityChance == 25) {
                        content += 'They explored the world and found a statue of their ' + familyGenerator() + '.  The haunting visage kept them awake for three nights. ';
                    } else if (activityChance == 26 && $StoryStore[0].bird == 0) {
                        if ($CharStore[x].gender == 1) {
                            content += $CharStore[x].name + ' defended KM-Station. While exploring the world, she discovered a small bird locked inside a cage. It was red with blue-tipped wings and a sharp, long beak. The cage was attached to a rusty hook hanging off a 15-foot-pole cemented into the ground in the center of a grove of trees. Off in the distance, a few miles away but in clear sight, a Boeing 757 was eternally burning. She decided the bird was more interesting - and safer - so she set her mind to rescuing it. ';
                        } else if ($CharStore[x].gender == 2) {
                            content += $CharStore[x].name + ' defended KM-Station. While exploring the world, he discovered a small bird locked inside a cage. It was red with blue-tipped wings and a sharp, long beak. The cage was attached to a rusty hook hanging off a 15-foot-pole cemented into the ground in the center of a grove of trees. Off in the distance, a few miles away but in clear sight, a Boeing 757 was eternally burning. He decided the bird was more interesting - and safer - so he set his mind to rescuing it. ';
                        }
                        $StoryStore[0].bird = 1;
                        $StoryStore[0].character = $CharStore[x].ID;
                    } else if (activityChance == 27 && $StoryStore[1].voice == 0 && job == 0) {
                        if ($CharStore[x].gender == 1) {
                            content += 'While battling the ' + NextRaid[0] + ', she was bitten on her left bicep. The wound healed within a few days but there was a distinct, uncomfortable throbbing underneath the surface of her skin. A tiny, whispered voice began to call in the back of her mind, speaking the unspeakable. A new activity has become available. ';
                        } else if ($CharStore[x].gender == 2) {
                            content += 'While battling the ' + NextRaid[0] + ', he was bitten on his left bicep. The wound healed within a few days but there was a distinct, uncomfortable throbbing underneath the surface of his skin. A tiny, whispered voice began to call in the back of his mind, speaking the unspeakable. A new activity has become available. ';
                        }
                        $StoryStore[1].voice = 1;
                        $StoryStore[1].character = $CharStore[x].ID;
                    } else {
                        content += 'They searched the world, poking around piles of ' + materialGenerator() + ' and coming up with nothing of interest. ';
                    }
                }
                if (activity == 'Listen to the Mysterious Voice' && $StoryStore[1].voice == 1) {
                    if ($CharStore[x].gender == 1) {
                        content += 'She tried everything to ignore it but the voice in the back of her head was defeaning. It corrupted every thought, pulling her attention back to its existence repeatedly. Every waking moment, every sleepless night was penetrated by the constant buzzing of the voice. ' + $CharStore[x].name + ' has begun convering her ears with her hands everywhere she goes, much to the concern of the other residents. ';
                    } else if ($CharStore[x].gender == 2) {
                        content += 'He tried everything to ignore it but the voice in the back of his head was defeaning. It corrupted every thought, pulling his attention back to its existence repeatedly. Every waking moment, every sleepless night was penetrated by the constant buzzing of the voice. ' + $CharStore[x].name + ' has begun convering his ears with his hands everywhere he goes, much to the concern of the other residents. ';
                    }
                    $StoryStore[1].voice = 2;
                } else if (activity == 'Listen to the Mysterious Voice' && $StoryStore[1].voice == 2) {
                    content += 'What was quietness? What was peace? There was only the voice. There was only the relentless, eternal hum of the unspeakable. There was only one thought any more that ran through their mind. One evil, wicked thought that was becoming harder and harder to resist... ';
                    $StoryStore[1].voice = 3;
                } else if (activity == 'Listen to the Mysterious Voice' && $StoryStore[1].voice == 3) {
                    if ($CharStore[x].gender == 1) {
                        content += 'At last, there was peace. After weeks of deafening dark thoughts, she submitted to the evil that festered in her mind. The task was done. She poisoned the water supply of KM-Station and then slept like a newborn babe. She awoke twelve hours later, well-rested and devoid of any voices in her head except her own. But was it worth the cost? ';
                    } else if ($CharStore[x].gender == 2) {
                        content += 'At last, there was peace. After weeks of deafening dark thoughts, he submitted to the evil that festered in his mind. The task was done. He poisoned the water supply of KM-Station and then slept like a newborn babe. He awoke twelve hours later, well-rested and devoid of any voices in his head except his own. But was it worth the cost? (-1 Health to Everyone in KM-Station) ';
                    }
                    $StoryStore[1].voice = 4;
                }
                if (activity == 'Resist the Mysterious Voice' && $StoryStore[1].voice == 1) {
                    if ($CharStore[x].gender == 1) {
                        content += 'She devoted every ounce of energy she had into ignoring the voice that festered in her mind. It ate away at her from the inside. It became her nightmares. It began to manifest whenever she closed her eyes. It escalated from being a voice to being an eternal screech. Ever-present; ever-painful. There was left to do but continue to fight the voice. (-1 Health Each Turn While ' + $CharStore[x].name + ' is Alive)';
                    } else if ($CharStore[x].gender == 2) {
                        content += 'He devoted every ounce of energy he had into ignoring the voice that festered in his mind. It ate away at him from the inside. It became his nightmares. It began to manifest whenever he closed his eyes. It escalated from being a voice to being an eternal screech. Ever-present; ever-painful. There was left to do but continue to fight the voice. (-1 Health Each Turn While ' + $CharStore[x].name + ' is Alive)';
                    }
                    $StoryStore[1].voice = 5;
                }
                // Add more to the Resist the Mysterious Voice storyline
            }
            logContent.push(content);
            content = '';
        }
        // Remove 1 health if everyone is poisoned
        if ($StoryStore[1].voice == 4) {
            for (let y = 0; y < $CharStore.length; y++) {
                if ($CharStore[y].health > 0) {
                    $CharStore[y].health -= 1;
                }
            }
        }
        // Add a new character if the player has free bunks
        if ($MainStore.shelters > $CharStore.length) {
            charGenerator(($CharStore.length + 1));
            $MainStore.livingCharacters++;
            content = $CharStore[$CharStore.length - 1].name + ' was pulled from the abstract destruction of the world. They have taken up residence in KM-Station.';
            logContent.push(content);
        }
        // Combat
        defense += ($MainStore.turrets * 2);
        let raid = 0;
        let raidText = '';
        let combatRemainder = 0;
        let j = 0;
        while (j < $NextRaid.length) {
            let enemyRaidName = $NextRaid[j];
            for (let m = 0; m < $EnemyStore.length; m++) {
                if ($EnemyStore[m].name == enemyRaidName) {
                    raid += $EnemyStore[m].fighting;
                }
            }
            j++;
        }
        if (defense - raid >= 0) {
            raidText = 'The raid has been successfully repelled. KM-Station has gained 3 resources.';
            $MainStore.resources += 3;
        } else {
            raidText = 'The raid broke through!';
            combatRemainder = raid - defense;
            for (let y = 0; y < $CharStore.length; y++) {
                if ($CharStore[y].health > 0) {
                    $CharStore[y].health -= combatRemainder;
                    if ($CharStore[y].health <= 0) {
                        $MainStore.livingCharacters -= 1;
                        $MainStore.deadCharacters += 1;
                    }
                }
            }
        }
        // Increase the list of active monsters
        let enemyChoice = random(1,3);
        if (enemyChoice == 1) {
            if ($MainStore.week < 10) {
                enemyGenerator(1, 4);
            } else if ($MainStore.week >= 10 && $MainStore.week < 20) {
                enemyGenerator(1, 8);
            } else if ($MainStore.week > 20) {
                enemyGenerator(1, 15);
            }
        }
        // Generate the raid list for the next raid
        if ($MainStore.week % 5 == 0) {
            $MainStore.enemyPower += 1;
        }
        $NextRaid = [];
        let i = 1;
        while (i <= $MainStore.enemyPower) {
            let enemyChoice = Math.floor(Math.random() * $EnemyStore.length);
            let enemyName = $EnemyStore[enemyChoice].name;
            $NextRaid.push(enemyName);
            i++;
        }
        // Apply doctoring values
        for (let y = 0; y < $CharStore.length; y++) {
            if ($CharStore[y].health > 0) {
                $CharStore[y].health += doctoring;
            }
        }
        // Update the Event Log
        let title = 'Week ' + $MainStore.week + ', Unknown Year';
        let logList = {title, logContent, raid, defense, raidText};
        LogStore.update(log => {
        return [logList, ...log];})
    }
</script>

<button on:click={endTurn}>End Turn</button>