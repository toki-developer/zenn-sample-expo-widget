//
//  DataManager.swift
//  zennwidgetsample
//
//  Created by tokio koike on 2025/11/30.
//

struct SampleModel: Identifiable {
  var id: String
  var name: String
}

class DataManager {
  static let shared = DataManager()
  
  func loadSampleData() -> [SampleModel] {
    var data = [
      SampleModel(id: "1", name: "hoge"),
      SampleModel(id: "2", name: "fuga")
    ]
    
    return data
  }
}
