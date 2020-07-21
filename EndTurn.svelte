<script>
    import { charGenerator } from './Generators/charGenerator.js';
    import { enemyGenerator } from "./Generators/enemyGenerator.js";
    import { animalGenerator, colorGenerator, creativeGenerator, emotionGenerator, familyGenerator, materialGenerator } from './Generators/worldGenerator.js';
    import { CharStore, LogStore, EnemyStore, MainStore, NextRaid, StoryStore, WorldStore } from './store.js';
    import { random } from './random.js';
    import { worldContent } from './Stories/world.js';

    const endTurn = () => {
        $MainStore.week += 1;
        let fighting = 0;
        let scavenging = 0;
        let doctoring = 0;
        let title = 'Week ' + $MainStore.week + ', Unknown Year';
        let charContent = [];
        for (let x = 0; x < $CharStore.length; x++) {
            // >>>>>>>> Add something if the player is dead?
            if ($CharStore[x].health > 0) {
                ///// JOBS /////
                let job = document.getElementById("job" + (x + 1)).options.selectedIndex;
                // Defender
                if (job == 0) {
                    fighting += $CharStore[x].fighting;
                }
                // Scavenger
                if (job == 1) {
                    scavenging += $CharStore[x].scavenging;
                }
                // Medic
                if (job == 2) {
                    doctoring += $CharStore[x].doctoring;
                }
                ///// ACTIVITIES /////
                let activityList = document.querySelector("#activity" + (x + 1));
                let activity = activityList.value;
                let name = $CharStore[x].name;
                let gender = $CharStore[x].gender;
                let activityContent = '';
                if (activity == 'Explore the Collapsed World') {
                    activityContent = worldContent(name, gender);
                }
                let charLogList = {name, gender, activity, activityContent};
                charContent.push(charLogList);
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
        ///// COMBAT /////
        let raidContent = [];
        // Add turret values (1 point per turret)
        fighting += ($MainStore.turrets);
        // 10% chance of double the player's fighting
        let combatChance = random(1,101);
        if (combatChance > 90) {
            fighting *= 2;
        }
        let raid = 0;
        let raidText = '';
        let combatRemainder = 0;
        let j = 0;
        // Cycle through the raid list (NextRaid) and add it to the raid value
        while (j < $NextRaid.length) {
            let enemyRaidName = $NextRaid[j];
            for (let m = 0; m < $EnemyStore.length; m++) {
                if ($EnemyStore[m].name == enemyRaidName) {
                    raid += $EnemyStore[m].fighting;
                }
            }
            j++;
        }
        if (fighting - raid >= 0) {
            raidText = 'The raid has been successfully repelled. KM-Station has gained ' + $NextRaid.length + ' resources.';
            $MainStore.resources += $NextRaid.length;
        } else {
            raidText = 'The raid broke through!';
            combatRemainder = raid - fighting;
            for (let y = 0; y < $CharStore.length; y++) {
                if ($CharStore[y].health > 0) {
                    $CharStore[y].health -= combatRemainder;
                    if ($CharStore[y].health <= 0) {
                        $MainStore.livingCharacters -= 1;
                    }
                }
            }
        }
        // 50 percent chance to add a new Transfigured to the list
        if (($MainStore.station == 1) && (random(1,3) == 1)) {
            enemyGenerator(1,2,$MainStore.station);
        } else if (($MainStore.station == 2) && (random(1,3) == 1)) {
            enemyGenerator(2,3,$MainStore.station);
        } else if (($MainStore.station == 3) && (random(1,3) == 1)) {
            enemyGenerator(2,4,$MainStore.station);
        } else if (($MainStore.station == 4) && (random(1,3) == 1)) {
            enemyGenerator(3,5,$MainStore.station);
        } else if (($MainStore.station == 5) && (random(1,3) == 1)) {
            enemyGenerator(4,6,$MainStore.station);
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
        let raidList = {raid, fighting, raidText};
        raidContent.push(raidList);
        // Doctoring
        let doctoringChance = random(1,101);
        if (doctoringChance >= 90) {
            doctoring *= 2;
        }
        for (let y = 0; y < $CharStore.length; y++) {
            if ($CharStore[y].health > 0) {
                $CharStore[y].health += doctoring;
                if ($CharStore[y].health > 10) {
                    $CharStore[y].health = 10;
                }
            }
        }
        // Scavenging
        let scavengingChance = random(1,101);
        if (scavengingChance >= 90) {
            scavenging *= 2;
        }
        $MainStore.resources += scavenging;
        // Add a new character if the player has free bunks
        // >>>>>>>>> Add something here to update the log?
        if ($MainStore.shelters > $CharStore.length) {
            charGenerator(($CharStore.length + 1));
            $MainStore.livingCharacters++;
        }
        // Update the Event Log
        let logList = {title, charContent, raidContent, scavenging, doctoring};
        LogStore.update(log => {
        return [logList, ...log];})
    }
</script>

<button on:click={endTurn}>End Turn</button>