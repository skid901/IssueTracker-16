//
//  MilestoneViewController.swift
//  IssueTracker
//
//  Created by 홍경표 on 2020/10/28.
//

import UIKit

class MilestoneViewController: UIViewController {
    
    // MARK: - Properties
    
    var milestones = [Milestone]()
    
    // MARK: - View Life Cycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        milestones.append(Milestone(id: 0, title: "스프린트2", dueDate: "2020-06-19", description: "이번 배포를 위한 스프린트", openIssues: 13, closedIssues: 23))
        milestones.append(Milestone(id: 0, title: "스프린트3", dueDate: "2020-06-26", description: "다음 배포를 위한 스프린트", openIssues: 0, closedIssues: 0))
//        milestones = [
//            ("스프린트2", "이번 배포를 위한 스프린트", "2020-06-19", 13, 23),
//            ("스프린트3", "다음 배포를 위한 스프린트", "2020-06-26", 0, 0)
//        ]
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        guard let vc = segue.destination as? AddAlertViewController else { return }
        if let sender = sender as? Milestone {
            vc.addInputView(title: "제목", placeholder: "", text: sender.title)
            vc.addInputView(title: "완료날짜", placeholder: "yyyy-mm-dd (선택)", text: sender.dueDate)
            vc.addInputView(title: "설명", placeholder: "", text: sender.description)
        } else {
            vc.addInputView(title: "제목", placeholder: "", text: "")
            vc.addInputView(title: "완료날짜", placeholder: "yyyy-mm-dd (선택)", text: "")
            vc.addInputView(title: "설명", placeholder: "", text: "")
        }
    }
    
}

// MARK: - UICollectionView Data Source

extension MilestoneViewController: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return milestones.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: MilestoneCollectionViewCell.identifier, for: indexPath) as? MilestoneCollectionViewCell,
              indexPath.row < milestones.count else {
            return UICollectionViewCell()
        }
        let index = indexPath.row
        cell.configure(
            title: milestones[index].title,
            dueDate: milestones[index].dueDate,
            description: milestones[index].description,
            openIssues: milestones[index].openIssues,
            closedIssues: milestones[index].closedIssues
        )
        return cell
    }
}

// MARK: - UICollectionView Delegate FlowLayout

extension MilestoneViewController: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return .init(width: view.bounds.width, height: 80)
    }
}

// MARK: - UICollectionView Delegate

extension MilestoneViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        guard indexPath.row < milestones.count else {
            performSegue(withIdentifier: "presentAddAlertViewContoller", sender: nil)
            return
        }
        let index = indexPath.row
        performSegue(withIdentifier: "presentAddAlertViewContoller", sender: milestones[index])
    }
}