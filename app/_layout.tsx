import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Paths } from "expo-file-system";
import { Stack } from "expo-router";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useMemo } from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

const APP_GROUP_ID = "group.com.toki-developer.zenn-widget-sample.widget";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const dbDirectory = useMemo(() => {
    return Paths.appleSharedContainers[APP_GROUP_ID]?.uri;
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SQLiteProvider
        databaseName="database.db"
        directory={dbDirectory}
        onInit={migrateDbIfNeeded}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </SQLiteProvider>
    </ThemeProvider>
  );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let currentDbVersion;
  let res = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");
  currentDbVersion = res ? res.user_version : 0;
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    // テーブル作成
    await db.execAsync(`
      CREATE TABLE sample (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    // 初期データ挿入
    await db.execAsync(`
      INSERT INTO sample (id, name) VALUES
      (1, 'hoge'),
      (2, 'Hello Widget');
    `);

    currentDbVersion = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
