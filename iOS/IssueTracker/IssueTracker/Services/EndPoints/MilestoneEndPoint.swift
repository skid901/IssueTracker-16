//
//  MilestoneEndPoint.swift
//  IssueTracker
//
//  Created by woong on 2020/10/28.
//

import Foundation
import NetworkService

enum MilestoneEndPoint: EndPointType {
    
    case list
    case create(body: Parameters)
    case delete(id: Int, body: Parameters)
    case update(id: Int, body: Parameters)
    
    var baseURL: URL? {
        return URL(string: "http://issue-tracker.kro.kr:3000/api/")
    }
    
    var path: String {
        switch self {
        case .list, .create:
            return "milestones"
        case .update(let id, _), .delete(let id, _):
            return "milestones/\(id)"
        }
    }
    
    var httpMethod: HTTPMethod {
        switch self {
            case .list: return .get
            case .create: return .post
            case .delete: return .delete
            case .update: return .put
        }
    }
    
    var task: HTTPTask {
        switch self {
        case .list: return .request
        case .create(let data):
            return .requestParameters(bodyParameters: data,
                                      bodyEncoding: .jsonEncoding,
                                      urlParameters: nil)
        case .delete(_, let data), .update(_, let data):
            return .requestParameters(bodyParameters: data,
                                      bodyEncoding: .jsonEncoding,
                                      urlParameters: nil)
        }
    }
    
    var headers: HTTPHeaders? {
        switch self {
            case .list, .create, .delete, .update: return nil
        }
    }
}