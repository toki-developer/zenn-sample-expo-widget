//
//  DataManager.swift
//  zennwidgetsample
//
//  Created by tokio koike on 2025/11/30.
//
import Foundation
import SQLite3

struct SampleModel: Identifiable {
  var id: String
  var name: String
}

class DataManager {
  static let shared = DataManager()
  
  func loadSampleData() -> [SampleModel] {
    guard let db = DatabaseManager.shared.openDatabase() else { return [] }
    defer { DatabaseManager.shared.closeDatabase() }
    
    return getSampleList(db: db)
  }
  
  private func getSampleList(db: OpaquePointer) -> [SampleModel] {
    var results: [SampleModel] = []
    let query = "SELECT id, name FROM sample;"
    var statement: OpaquePointer?

    if sqlite3_prepare_v2(db, query, -1, &statement, nil) == SQLITE_OK {
        while sqlite3_step(statement) == SQLITE_ROW {
            let id = String(cString: sqlite3_column_text(statement, 0))
            let name = String(cString: sqlite3_column_text(statement, 1))
            results.append(SampleModel(id: id, name: name))
        }
    }
    sqlite3_finalize(statement)
    
    return results
  }
}

class DatabaseManager {
    static let shared = DatabaseManager()
    
    let dbPath: String
    private var db: OpaquePointer?
    
    private init() {
        let appGroupId = "group.com.toki-developer.zenn-widget-sample.widget"

        guard let container = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: appGroupId) else {
            fatalError("App Group設定エラー")
        }
        
        self.dbPath = container.appendingPathComponent("database.db").path
    }
    
    func openDatabase() -> OpaquePointer? {
        if !FileManager.default.fileExists(atPath: dbPath) {
            print("データベースファイルが存在しません: \(dbPath)")
            return nil
        }
        
        if sqlite3_open(dbPath, &db) == SQLITE_OK {
            return db
        } else {
            print("SQLite接続エラー: \(String(cString: sqlite3_errmsg(db)))")
            return nil
        }
    }
    
    func closeDatabase() {
        if db != nil {
            sqlite3_close(db)
            db = nil
        }
    }
}
