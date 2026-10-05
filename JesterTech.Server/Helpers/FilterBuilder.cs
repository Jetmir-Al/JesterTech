using System.Linq.Expressions;

namespace JesterTech.Server.Helpers
{
    public class FilterBuilder<T>
    {
        private readonly List<Expression<Func<T, bool>>> _filters = new();

        public FilterBuilder<T> AddFilter(Expression<Func<T, bool>> predicate, bool condition)
        {
            if (condition)
            {
                _filters.Add(predicate);
            }
            return this;
        }

        public Expression<Func<T, bool>> Build()
        {
            if (_filters.Count == 0)
            {
                return x => true;
            }

            var parameter = Expression.Parameter(typeof(T), "x");
            Expression? combined = null;

            foreach (var filter in _filters)
            {
                var remappedBody = ParameterRebinder.ReplaceParameters(filter.Parameters[0], parameter, filter.Body);

                combined = combined == null ? remappedBody : Expression.AndAlso(combined, remappedBody);
            }

            return Expression.Lambda<Func<T, bool>>(combined!, parameter);
        }
    }

    internal class ParameterRebinder : ExpressionVisitor
    {
        private readonly ParameterExpression _oldParameter;
        private readonly ParameterExpression _newParameter;

        public ParameterRebinder(ParameterExpression oldParameter, ParameterExpression newParameter)
        {
            _oldParameter = oldParameter;
            _newParameter = newParameter;
        }

        public static Expression ReplaceParameters(ParameterExpression oldParameter, ParameterExpression newParameter, Expression body)
        {
            return new ParameterRebinder(oldParameter, newParameter).Visit(body);
        }

        protected override Expression VisitParameter(ParameterExpression node)
        {
            return node == _oldParameter ? _newParameter : base.VisitParameter(node);
        }
    }
}
