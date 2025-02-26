# Idle Poll

Site is available at [https://infernal3.github.io/IdlePoll](https://infernal3.github.io/IdlePoll).

This project is based on an idle poll that I've been posting for a while.
An example of such a poll is:
```ini
Idle poll, Round #22
1.00e6885 Points

Options:
[O1] +1e1760 Points (Base: +1e80, boosted by U4)
[O2] x1e79 Points
[O3] ^1.5 Points
Due to U5, O1-O3 will activate an additional time at the end of the round.

Upgrades:
[U1] Multiplying O1, O2 effects by x1e78.     | Bought x26. Next at 1e819 Points
[U2] O3 is unlocked.                          | BOUGHT
[U3] U1 is rebuyable and now also boosts O1.  | BOUGHT
[U4] Raising O1 effect to the round number.   | BOUGHT
[U5] O1-O3 is activated every round.          | BOUGHT

Unlocks:
[UNL1] Unlock the next feature...             | Cost: 1e1000000 Points

Scaling and Softcaps:
Points gain will softcap after 1e1000000 Points.
```

Each option in **Options** and each upgrade in **Upgrades** counts as an **action**.
Actions advance the round counter and modify the idle.

In its original format, the poll would be posted between different actions and the winning action would be chosen.
Now in a singleplayer form, the player can have sole jurisdiction over which action to choose.

The possibilities are many.



## Acknowledgements

Library used:
break_infinity.js ([https://github.com/Patashu/break_infinity.js](https://github.com/Patashu/break_infinity.js))
