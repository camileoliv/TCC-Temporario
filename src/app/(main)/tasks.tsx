import { useState } from "react";
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
} from "react-native";
import { router } from 'expo-router';
import { useFontSize } from '../../context/FontSizeContext';
import { useAudio } from '../../context/AudioContext';

type Task = {
    id: number;
    title: string;
    description: string;
    game: string;
    completed: boolean;
};

const TASKS: Task[] = [
    {
        id: 1,
        title: "O Labirinto de Letras",
        description: "Você se encontra preso em um labirinto misterioso onde cada parede e corredor são formadas por letras. Para encontrar a saída, precisa formar palavras e resolver quebra-cabeças que revelam o caminho correto.",
        game: "Mundo das Palavras",
        completed: true,
    },
    {
        id: 2,
        title: "A Jornada Culinária",
        description: "Embarque em uma aventura gastronômica onde cada ingrediente descoberto revela um novo segredo da culinária mundial.",
        game: "A Jornada dos Chefs",
        completed: false,
    },
    {
        id: 3,
        title: "Os Segredos dos Elementos",
        description: "Desvende os mistérios dos quatro elementos naturais em um templo antigo cheio de desafios científicos.",
        game: "Templo dos Elementos",
        completed: false,
    },
];

const GAMES = ["Todos os Jogos", "Mundo das Palavras", "A Jornada dos Chefs", "Templo dos Elementos"];

export default function Tarefas() {
    const [activeTab, setActiveTab] = useState<"completed" | "pending">("completed");
    const { playEffect } = useAudio();
    const [selectedGame, setSelectedGame] = useState<string>("Todos os Jogos");

    const { fontSize } = useFontSize();

    const filteredTasks = TASKS.filter(task => {
        const statusMatch = activeTab === "completed" ? task.completed : !task.completed;
        const gameMatch = selectedGame === "Todos os Jogos" || task.game === selectedGame;
        return statusMatch && gameMatch;
    });

      const goBackk = () => {
        playEffect(require('../../assets/audio/African3.mp3'));
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/(main)/menu");
        }
      };

    return (
        <ImageBackground
            source={require('../../assets/images/Background_Yellow.png')}
            className="flex-1 flex-row p-2"
            resizeMode="cover"
        >
            {/* Conteúdo Principal */}
            <View className="flex-1 p-2">
                {/* Header */}
                <View className="flex-row items-center justify-start gap-4 mt-4 ml-4">
                    <TouchableOpacity onPress={goBackk}>
                                  <Image
                                    source={require('../../assets/images/C_LeftArrow1.png')}
                                    className="w-[60px] h-[62px] mr-6"
                                  />
                                </TouchableOpacity>
                    
                    <Text
                        className="font-CuteDino text-black"
                        style={{ fontSize }}
                    >
                        Menu de Tarefas
                    </Text>
                </View>

                {/* Tabs */}
                <View className="flex-row items-center justify-center gap-8 mt-3 mb-4">
                    <TouchableOpacity
                        className={`px-5 py-2 rounded-xl border-4 border-[#6C5671] ${
                            activeTab === "completed" ? "bg-[#92EC8F]" : "bg-green-100"
                        }`}
                        onPress={() => setActiveTab("completed")}
                    >
                        <Text
                            className="font-CuteDino text-black"
                            style={{ fontSize }}
                        >
                            Tarefas Completadas
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`px-5 py-2 rounded-xl border-4 border-[#6C5671] ${
                            activeTab === "pending" ? "bg-[#92EC8F]" : "bg-green-100"
                        }`}
                        onPress={() => setActiveTab("pending")}
                    >
                        <Text
                            className="font-CuteDino text-black"
                            style={{ fontSize }}
                        >
                            Tarefas a Concluir
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Lista de Tarefas */}
                <ScrollView className="flex-1 mb-4">
                    {filteredTasks.map(task => (
                        <View
                            key={task.id}
                            className="bg-[#92EC8F] border-4 border-[#6C5671] rounded-xl p-4 mb-4 shadow"
                        >
                            <Text
                                className="font-CuteDino text-black mb-2"
                                style={{ fontSize }}
                            >
                                {task.title}
                            </Text>
                            <Text
                                className="font-GlutenBold text-black mb-3"
                                style={{ fontSize: fontSize - 2 }}
                            >
                                {task.description}
                            </Text>
                            <View className="flex-row justify-between items-center">
                                <Image
                                    source={
                                        task.completed
                                            ? require("../../assets/images/Star.png")
                                            : require("../../assets/images/Empty-star.png")
                                    }
                                    className="w-6 h-6"
                                />
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Sidebar */}
            <View className="w-[280px] h-[350px] items-center justify-center mt-16 rounded-3xl bg-[#92EC8F] border-4 border-[#6C5671] mx-5">
                <Image
                    source={require("../../assets/images/Controle.png")}
                    className="mt-4 w-[60px] h-[62px]"
                    resizeMode="contain"
                />
                <Text
                    className="font-CuteDino pt-5 pb-5"
                    style={{ fontSize }}
                >
                    Jogos das Tarefas
                </Text>

                <ScrollView className="w-full px-4">
                    {GAMES.map(game => (
                        <TouchableOpacity
                            key={game}
                            className={`font-CuteDino px-4 py-2 rounded-full mb-2 ${
                                selectedGame === game ? "bg-[#87a889]" : "bg-white"
                            }`}
                            onPress={() => setSelectedGame(game)}
                        >
                            <Text
                                className={`font-CuteDino text-center ${
                                    selectedGame === game ? "text-white" : "text-black"
                                }`}
                                style={{ fontSize }}
                            >
                                {game}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </ImageBackground>
    );
}
