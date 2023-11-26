import { WordBanks } from "../constants/WordBanks";
import { Game } from "../types/Game";
import { Player } from "../types/Player";
import { RoomSettings } from "../types/RoomSettings";

export class GameService {
    game: Game;
    settings: RoomSettings;

    getGameState(){
        return this.game;
    }

    getSettings(){
        return this.settings;
    }

    initializeGame(players: Player[], settings?: RoomSettings) {
        this.settings = settings ?? defaultSettings;
        if(settings.teams > 2)
            throw "Game does not support more than 2 teams yet."

        this.game.teamStrikes = [3,3];
        this.game.state = "new";
        this.game.teamPoints = [0,0];
        this.game.artistOrder = this.generateArtistOrder(players);
    }

    startGame() {
        this.game.state = "inProgress";
        const team1Artist = this.game.artistOrder[0][0];
        const team2Artist = this.game.artistOrder[1][0];
        const team1Word = WordBanks[this.settings.wordBank][0];
        const team2Word = WordBanks[this.settings.wordBank][1];
        this.game.currentArtistPlayerId = [team1Artist, team2Artist];
        this.game.currentWord = [team1Word, team2Word];
        this.game.hintDisplay = [this.generateHintDisplay(team1Word), this.generateHintDisplay(team2Word)];
        this.game.usedWords = [[team1Word], [team2Word]];
        this.game.usedArtists = [[team1Artist], [team2Artist]];
    }

    strikeTeam(team: number){
        this.game.teamStrikes[team] = this.game.teamStrikes[team]--;
    }

    rotateArtistAndWord(team: number){
        this.rotateArtist(team);
        this.rotateWord(team);
    }

    rotateArtist(team: number){
        let nextArtist = this.game.artistOrder[team].find(artist => !this.game.usedArtists[team].some(used => artist === used))
        if (!nextArtist){
            nextArtist = this.game.artistOrder[team][0];
            this.game.usedArtists[team] = [];
        }
        this.game.usedArtists[team].push(nextArtist);
        this.game.currentArtistPlayerId[team] = nextArtist;
    }

    rotateWord(team: number){
        let nextWord = WordBanks[this.settings.wordBank].find(word => !this.game.usedWords[team].some(used => used === word));
        if(!nextWord){
            nextWord = WordBanks[this.settings.wordBank][0];
            this.game.usedWords[team] = [];
        }
        this.game.usedWords[team].push(nextWord);
        this.game.currentWord[team] = nextWord;
    }

    private generateArtistOrder(players: Player[]){
        const team1Players = players.filter(player => player.team === 1).map(player => player.id);
        const team2Players = players.filter(player => player.team === 2).map(player => player.id);

        // TODO: Randomize this order.
        // TODO: Handle adding a new player to a team mid-game
        return [team1Players, team2Players];
    }

    private generateHintDisplay(word: string){
        // TODO: Subsequent hints
        return word.replace("\\S", "_");
    }
}

const defaultSettings: RoomSettings = {
    gameMode: "",
    wordBank: "default",
    customWords: [],

    drawTime: 60,
    teams: 2,
    teamPlayers: 6,
    hints: 2,

    isHints: true,
    isAutoTeamBalance: true
}