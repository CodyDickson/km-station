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
        let title = 'Week ' + $MainStore.week + ', Unknown Year';
        let charContent = [];
        for (let x = 0; x < $CharStore.length; x++) {
            // >>>>>>>> Add something if the player is dead?
            if ($CharStore[x].health > 0) {
                let jobContent = '';
                let activityContent = '';
                ///// JOBS /////
                let job = document.getElementById("job" + (x + 1)).options.selectedIndex;
                let chance = random(0,101);
                // Defender
                if (job == 0) {
                    defense += $CharStore[x].fighting;
                    job = 'Defender';
                    jobContent = '+' + $CharStore[x].fighting + ' Base Defense';
                }
                // Scavenger
                if (job == 1 && $CharStore[x].scavenging < 5 && chance >= 90) {
                    job = 'Scavenger';
                    $MainStore.resources += 3;
                    jobContent += '+3 Resources (Critical Success!)';
                    $CharStore[x].scavenging += 1;
                } else if (job == 1 && $CharStore[x].scavenging < 5 && chance < 90) {
                    job = 'Scavenger';
                    $MainStore.resources += 1;
                    jobContent += '+1 Resource';
                } else if (job == 1 && $CharStore[x].scavenging >= 5 && $CharStore[x].scavenging < 10 && chance >= 90) {
                    job = 'Scavenger';
                    $MainStore.resources += 5;
                    jobContent += '+5 Resources (Critical Success!)';
                    $CharStore[x].scavenging += 1;
                } else if (job == 1 && $CharStore[x].scavenging >= 5 && $CharStore[x].scavenging < 10 && chance < 90) {
                    job = 'Scavenger';
                    $MainStore.resources += 3;
                    jobContent += '+3 Resources';
                } else if (job == 1 && $CharStore[x].scavenging >= 10 && chance >= 90) {
                    job = 'Scavenger';
                    $MainStore.resources += 7;
                    jobContent += '+7 Resources (Critical Success!)';
                    if ($CharStore[x].scavenging < 15) {
                        $CharStore[x].scavenging += 1;
                    }
                } else if (job == 1 && $CharStore[x].scavenging >= 10 && chance < 90) {
                    job = 'Scavenger';
                    $MainStore.resources += 5;
                    jobContent += '+5 Resources';
                }
                // Medic
                if (job == 2 && $CharStore[x].doctoring < 5 && chance >= 90) {
                    job = 'Medic';
                    doctoring += 2;
                    jobContent += '+2 Health to Everyone (Critical Success!)';
                    $CharStore[x].doctoring += 1;
                } else if (job == 2 && $CharStore[x].doctoring < 5 && chance < 90) {
                    job = 'Medic';
                    doctoring += 1;
                    jobContent += '+1 Health to Everyone';
                } else if (job == 2 && $CharStore[x].doctoring >= 5 && $CharStore[x].doctoring < 10 && chance >= 90) {
                    job = 'Medic';
                    doctoring += 3;
                    jobContent += '+3 Health to Everyone (Critical Success!)';
                    $CharStore[x].doctoring += 1;
                } else if (job == 2 && $CharStore[x].doctoring >= 5 && $CharStore[x].doctoring < 10 && chance < 90) {
                    job = 'Medic';
                    doctoring += 2;
                    jobContent += '+2 Health to Everyone';
                } else if (job == 2 && $CharStore[x].doctoring >= 10 && chance >= 90) {
                    job = 'Medic';
                    doctoring += 4;
                    jobContent += '+4 Health to Everyone (Critical Success!)';
                } else if (job == 2 && $CharStore[x].doctoring >= 10 && chance < 90) {
                    job = 'Medic';
                    doctoring += 3;
                    jobContent += '+3 Health to Everyone';
                }
                ///// ACTIVITIES /////
                let activityList = document.querySelector("#activity" + (x + 1));
                let activity = activityList.value;
                let activityChance;
                let temp = '';
                ///// EXPLORE THE COLLAPSED WORLD /////
                if (activity == 'Explore the Collapsed World') {
                    activityChance = random(1,2);
                    if (activityChance == 1) {
                        temp = colorGenerator();
                        activityContent += 'I wandered the world beyond the Station and found a flower with ' + temp + ' petals. I approached it with caution. It was beautiful, with a burgundy center and overlapping petals. As my hand hovered over the flower, I felt the ground begin to tremble. The dirt churned beneath my feed and dozens of flowers with ' + temp + ' petals began to grow. The ground erupted, split open under pressure, and then - as suddenly as it had started - it stopped.</p><p>I spent a few hours lying in the field of ' + temp + ' flowers. It was surprisingly calm and the scent reminded me of my ' + familyGenerator() + '. I wonder if these flowers bloomed from somewhere in my memories?</p><p><i>(' + $CharStore[x].name + ' has gained 1 Memory.)</i>';
                        $CharStore[x].memories += 1;
                    } else if (activityChance == 2) {
                        temp = animalGenerator();
                        activityContent += 'They explored the world and came across a group of ' + temp + ' which filled them with a sense of ' + emotionGenerator() + ' whenever they went near them. ';
                        if ($CharStore[x].obsession == temp) {
                            activityContent += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them.';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 3) {
                        activityContent += 'They explored the world and found a statue of their ' + familyGenerator() + '.  The haunting visage kept them awake for three nights. ';
                    } else if (activityChance == 4) {
                        temp = creativeGenerator();
                        activityContent += 'They explored the world and were overwhelmed with the desire to ' + temp + '. ';
                        if ($CharStore[x].obsession == temp) {
                            activityContent += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them. ';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 5) {
                        temp = colorGenerator();
                        activityContent += 'They explored the world and found themselves lost in a field of ' + colorGenerator() + ' flowers. They tried to pick one and found the petals had teeth. ';
                        if ($CharStore[x].obsession == temp) {
                            activityContent += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them. ';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 6) {
                        temp = animalGenerator();
                        activityContent += 'They explored the world and were chased away by a group of ' + temp + '. One of them had a face that was reminiscent of their ' + familyGenerator() + '. ';
                        if ($CharStore[x].obsession == temp) {
                            activityContent += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them.';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 7) {
                        temp = emotionGenerator();
                        activityContent += 'They searched a nearby abandoned building and caught their finger on a nail. Their brain was flooded with a sense of ' + temp + ' as the blood started to drip onto the dusty wooden floor. ';
                        if ($CharStore[x].obsession == temp) {
                            activityContent += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them. ';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 8) {
                        activityContent += 'While searching a nearby town, they found an old VHS player attached to a TV. They tested the remote and surprisingly, it worked. Home movies featuring ' + $CharStore[x].name + ' and their ' + familyGenerator() + ' started playing on an endless loop. ';
                    } else if (activityChance == 9) {
                        temp = emotionGenerator();
                        activityContent += "After sneaking off to take a nap inside a hunter's cabin, they were woken up by a massive red truck crashing through the wall. Just as it was about to run " + $CharStore[x].name + " over, it phased out of reality and left nothing except a strong wind, a hole in the wall, and the overwhelming feeling of " + temp + ". ";
                        if ($CharStore[x].obsession == temp) {
                            activityContent += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them. ';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 10) {
                        temp = animalGenerator();
                        activityContent += 'A thundering crash echoed through the area. ' + $CharStore[x].name + ' decided to investigate and discovered a library sticking out of the side of a mountain. They lifted themselves up with the help of the dripping pipes underneath the building, shattering a window with a rock and then climbing inside. They found row after row of books about ' + temp + '. ';
                        if ($CharStore[x].obsession == temp) {
                            activityContent += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them.';
                            $CharStore[x].level = 1;
                        }
                    } else if (activityChance == 11) {
                        temp = colorGenerator();
                        activityContent += 'They explored the world and found a small crack running down the center of a ceramic tile. This tile was especially odd because it was located in the middle of a completely empty field and immovable. Using whatever tool they had closest, ' + $CharStore[x].name + ' hammered the ceramic enough to make the crack an inch wide and several inches long. They leaned down and pressed their eye against the crack, seeing through a slight darkness to discover thousands upon thousands of ' + temp + ' bugs, skittering in all directions. ';
                        if ($CharStore[x].obsession == temp) {
                            activityContent += 'Something has awakened inside of ' + $CharStore[x].name + '. A new activity is available for them. ';
                            $CharStore[x].level = 1;
                        }
                    }
                }
                let name = $CharStore[x].name;
                let gender = $CharStore[x].gender;
                let charLogList = {name, gender, job, jobContent, activity, activityContent};
                charContent.push(charLogList);
                jobContent = '';
                activityContent = '';
            }
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
        // >>>>>>>>> Add something here to update the log?
        if ($MainStore.shelters > $CharStore.length) {
            charGenerator(($CharStore.length + 1));
            $MainStore.livingCharacters++;
        }
        ///// COMBAT /////
        let raidContent = [];
        // Add turret values (1 point per turret)
        defense += ($MainStore.turrets);
        // 10% chance of double the player's defense
        let combatChance = random(0,101);
        if (combatChance > 90) {
            defense *= 2;
        }
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
        // Increase the list of active Transfigured
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
        let raidList = {raid, defense, raidText};
        raidContent.push(raidList);
        // Update the Event Log
        let logList = {title, charContent, raidContent};
        LogStore.update(log => {
        return [logList, ...log];})
    }
</script>

<button on:click={endTurn}>End Turn</button>