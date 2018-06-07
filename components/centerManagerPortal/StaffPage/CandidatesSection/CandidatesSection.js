import {Component} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  Table,
  Badge
} from 'reactstrap'

export default class extends Component {
  render() {
    const { candidates } = this.props;
    return (
      <Card className="border-teal">
        <CardBody >
          <CardTitle className="mb-0">
            Assigned Candidates
          </CardTitle>
          <div>{candidates.length} candidate{candidates.length>1 && 's'}</div>
          <hr/>
          <Table responsive="responsive">
            <thead>
              <tr>
                <th>Name</th>
                <th>Tests Taken</th>
                <th>Phone Number</th>
                <th>Assignment</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate)=>(
                <tr>
                  <td>
                    <Link href={`/manager/candidate?id=${candidate._id}`} as={`/manager/candidate/${candidate._id}`}>
                      <a>{`${candidate.name.last} ${candidate.name.first}`}</a>
                    </Link>
                  </td>
                  <td>
                    <Badge color="success">Skill Analysis</Badge>{' '}
                    <Badge color="primary">Job Seeker</Badge>{' '}
                    <Badge color="danger">Entrepreneur</Badge>
                  </td>
                  <td>{candidate.phone}</td>
                  <td>Trainer {`<Bello Oladipupo>`}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    )
  }
}
