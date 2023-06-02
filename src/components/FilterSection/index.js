import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterSection = props => {
  const {
    employmentTypes,
    salaryRange,
    selectEmploymentType,
    selectSalaryRange,
  } = props

  const onChangeEmploymentType = event => {
    selectEmploymentType(event)
  }

  const onChangeSalaryRange = event => {
    selectSalaryRange(event)
  }

  return (
    <div className="filter-bg-container">
      <hr />

      <h1 className="filter-heading">Type of Employment</h1>

      <ul className="employment-type-list">
        {employmentTypesList.map(eachItem => (
          <li
            key={eachItem.employmentTypeId}
            className="employment-type-list-item"
          >
            <input
              className="employment-type-input"
              type="checkbox"
              value={eachItem.employmentTypeId}
              id={eachItem.employmentTypeId}
              checked={employmentTypes.includes(eachItem.employmentTypeId)}
              onChange={onChangeEmploymentType}
            />
            <label
              htmlFor={eachItem.employmentTypeId}
              className="employment-type-label"
            >
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>

      <hr />

      <h1 className="filter-heading">Salary Range</h1>

      <ul className="employment-type-list">
        {salaryRangesList.map(eachItem => (
          <li
            key={eachItem.salaryRangeId}
            className="employment-type-list-item"
          >
            <input
              className="employment-type-input"
              type="radio"
              value={eachItem.salaryRangeId}
              id={eachItem.salaryRangeId}
              checked={salaryRange === eachItem.salaryRangeId}
              onChange={onChangeSalaryRange}
            />
            <label
              htmlFor={eachItem.salaryRangeId}
              className="employment-type-label"
            >
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterSection
