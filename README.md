# What is the game?

This is a game of sports trading cards run on the ethereum block chain. Buy a surfer and the proceeds will transferred into a pot of money. You win prize money if your surfer is the overall champion at the end of the season (~50% of the total pot) OR if your surfer places 1st, 2nd or 3rd in one of the 10 competitions. If someone already owns a surfer you can make them an offer and if they accept you will receive the prize money earned by that surfer.

# How does it work?

The game works by minting an NFT for each of the surfers and transferring the ownership of the newly minted NFTs to the `WSLFantasyLeague` (WSL stands for World Surf League) contract. Users can then buy the surfers from the league which stores it's balance as available prize money. Upon the finalisation of each WSL competition the deployer calls the settleCompetition function picking 1st, 2nd and 3rd. The contract calculates the appropriate amount of prize money for each place and then distributes this to the owner of the surfer which placed (if the leauge still owns the NFT no money is transferred). Once all competitions have been settled there will be a champion and the league owner calls settleLeague. If someone owns the champ then all of the remaining balance in the league is transferred to them, otherwise the balance is redistributed evenly back amongst each of the players.

If you're interested in this project, run the app, open a new command prompt terminal and:

# How to run this repo

# compile your contracts

yarn compile

# deploy your hardhat contracts

yarn deploy

# start the react app (vite)

yarn start

This will deploy both the NFT and WSLFantasyLeague contracts, initialise the league by minting and transferring each of the surfers and spin a local development server for you interact with the league.
