import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  content: {
        flex: 1, // 2/3 da tela para o conteúdo principal
        paddingRight: 10,
    },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 20,
    textAlign: "center",
  },
  tabsContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#E8F5E9",
  },
  activeTab: {
    backgroundColor: "#2E7D32",
  },
  tabText: {
    fontSize: 16,
    color: "#2E7D32",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  tasksContainer: {
    flex: 1,
    marginBottom: 20,
  },
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: "#616161",
    marginBottom: 12,
    lineHeight: 20,
  },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gameTag: {
    fontSize: 12,
    color: "#757575",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 0,
  },
  starIcon: {
    width: 24,
    height: 24,
  },
  controllerIcon: {
    width: 40,
    height: 40,
    alignSelf: "center",
    marginBottom: 10,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 15,
  },
  gamesList: {
    maxHeight: 150,
  },
  gameButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  selectedGame: {
    backgroundColor: "#2E7D32",
  },
  gameText: {
    fontSize: 14,
    color: "#2E7D32",
  },
  selectedGameText: {
    color: "#FFFFFF",
  },
});